import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import RestaurantCard from "./RestaurantCard.jsx";
import Shimmer from "./Shimmer.jsx";
import { resArray } from "../utils/mockData";
import { RESTAURANTS_API_URL, USE_LIVE_SWIGGY_API } from "../utils/constants";

const withNoCache = (url) => {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}_=${Date.now()}`;
};

const getRestaurantsFromResponse = (data) => {
  const cards = data?.data?.cards ?? [];
  for (const card of cards) {
    const restaurants =
      card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    if (Array.isArray(restaurants) && restaurants.length > 0) {
      return restaurants.map((r) => r.info);
    }
  }
  return [];
};

const HOME_CARD_COUNT = 20;

const CITY_CONFIG = {
  hyderabad: {
    label: "Hyderabad",
    lat: "17.3850",
    lng: "78.4867",
    aliases: ["hyderabad", "hyd"],
  },
  delhi: {
    label: "Delhi",
    lat: "28.6139",
    lng: "77.2090",
    aliases: ["delhi", "new delhi", "ncr"],
  },
  bangalore: {
    label: "Bangalore",
    lat: "12.9716",
    lng: "77.5946",
    aliases: ["bangalore", "bengaluru", "blr"],
  },
};

const CITY_LIST = Object.values(CITY_CONFIG);

const buildCityLookup = (searchValue) => {
  const normalizedValue = searchValue.trim().toLowerCase();
  if (!normalizedValue) {
    return null;
  }

  return (
    CITY_LIST.find((city) =>
      city.aliases.some(
        (alias) => normalizedValue === alias || normalizedValue.includes(alias)
      )
    ) ?? null
  );
};

const replaceCoordinatesInUrl = (url, city) => {
  if (!url || !city) {
    return url;
  }

  return url
    .replace(/lat=[\d.]+/i, `lat=${city.lat}`)
    .replace(/lng=[\d.]+/i, `lng=${city.lng}`);
};

const normalizeRestaurant = (restaurant, fallbackCity = "Hyderabad") => ({
  ...restaurant,
  city:
    restaurant?.city ||
    restaurant?.address?.city ||
    restaurant?.citySlug ||
    fallbackCity,
});

const mapMockRestaurants = () =>
  resArray.map((r) => ({
    id: r.id,
    name: r.resName,
    cloudinaryImageId: r.imgId,
    cuisines: r.cuisine,
    avgRating: r.avgRating,
    sla: { deliveryTime: r.delieveryTime },
    costForTwo: r.costForTwo,
    locality: r.location,
    city: "Hyderabad",
  }));

const buildHomeRestaurantList = (liveRestaurants = []) => {
  const mockRestaurants = mapMockRestaurants();
  const seenIds = new Set();
  const mergedRestaurants = [];

  for (const restaurant of [...liveRestaurants, ...mockRestaurants]) {
    if (!restaurant?.id || seenIds.has(restaurant.id)) {
      continue;
    }

    seenIds.add(restaurant.id);
    mergedRestaurants.push(normalizeRestaurant(restaurant));

    if (mergedRestaurants.length === HOME_CARD_COUNT) {
      break;
    }
  }

  return mergedRestaurants;
};

const FILTERS = [
  { label: "All", fn: () => true },
  { label: "⭐ Top Rated (4.5+)", fn: (r) => Number(r.avgRating) >= 4.5 },
  { label: "⚡ Fast Delivery (<30 min)", fn: (r) => (r.sla?.deliveryTime ?? 99) < 30 },
];

const Body = () => {
  const { searchText } = useOutletContext();
  const [hotelList, setHotelList] = useState([]);
  const [activeFilter, setActiveFilter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const selectedCity = buildCityLookup(searchText);

  useEffect(() => {
    const fetchData = async () => {
      const fallbackCity = selectedCity?.label || "Hyderabad";

      if (!USE_LIVE_SWIGGY_API) {
        const data = buildHomeRestaurantList().filter(
          (restaurant) => !selectedCity || restaurant.city === fallbackCity
        );
        setHotelList(data);
        setIsLoading(false);
        return;
      }

      try {
        const cityUrl = selectedCity
          ? replaceCoordinatesInUrl(RESTAURANTS_API_URL, selectedCity)
          : RESTAURANTS_API_URL;
        const response = await fetch(withNoCache(cityUrl), {
          cache: "no-store",
        });
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        const json = await response.json();
        const restaurants = getRestaurantsFromResponse(json);
        if (restaurants.length > 0) {
          setHotelList(
            buildHomeRestaurantList(
              restaurants.map((restaurant) =>
                normalizeRestaurant(restaurant, fallbackCity)
              )
            )
          );
          setIsLoading(false);
          return;
        }
      } catch {
        console.warn("API failed, using fallback data.");
      }

      const fallbackRestaurants = buildHomeRestaurantList().filter(
        (restaurant) => !selectedCity || restaurant.city === fallbackCity
      );
      setHotelList(fallbackRestaurants);
      setIsLoading(false);
    };

    setIsLoading(true);
    fetchData();
  }, [selectedCity]);

  if (isLoading) return <Shimmer />;

  const normalizedSearch = searchText.trim().toLowerCase();

  const displayList = hotelList
    .filter(FILTERS[activeFilter].fn)
    .filter((r) => {
      if (!normalizedSearch) return true;
      return (
        r.name?.toLowerCase().includes(normalizedSearch) ||
        r.cuisines?.join(" ").toLowerCase().includes(normalizedSearch) ||
        r.locality?.toLowerCase().includes(normalizedSearch) ||
        r.city?.toLowerCase().includes(normalizedSearch)
      );
    });

  return (
    <main className="body">
      <section className="hero-section">
        <h1 className="hero-title">Hungry? We've got you. 🍔</h1>
        <p className="hero-subtitle">Order from your favourite restaurants</p>
      </section>

      <div className="filter-bar">
        {FILTERS.map((f, i) => (
          <button
            key={i}
            className={`filter-btn ${activeFilter === i ? "filter-btn-active" : ""}`}
            onClick={() => setActiveFilter(i)}
          >
            {f.label}
          </button>
        ))}
        <span className="result-count">{displayList.length} restaurants</span>
      </div>

      {displayList.length === 0 ? (
        <div className="empty-state">
          <p>😕 No restaurants match your search.</p>
          <button
            className="filter-btn filter-btn-active"
            onClick={() => {
              setActiveFilter(0);
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="res-container">
          {displayList.map((restaurant) => (
            <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`} className="res-card-link">
              <RestaurantCard hotelData={restaurant} />
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default Body;
