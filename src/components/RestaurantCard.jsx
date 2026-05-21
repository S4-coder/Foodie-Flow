import { baseURL } from "../utils/constants";

const StarRating = ({ rating }) => {
  const num = parseFloat(rating);
  const color =
    num >= 4.5 ? "rating-green" : num >= 4.0 ? "rating-yellow" : "rating-red";

  return <span className={`rating-badge ${color}`}>⭐ {rating}</span>;
};

const RestaurantCard = ({ hotelData }) => {
  const {
    name,
    cloudinaryImageId,
    cuisines,
    avgRating,
    sla,
    costForTwo,
    locality,
    city,
  } = hotelData;

  const deliveryTime = sla?.deliveryTime ?? sla?.delieveryTime ?? "N/A";

  return (
    <div className="res-card">
      <div className="res-img-container">
        <img
          className="res-logo"
          alt={name}
          src={baseURL + cloudinaryImageId}
          loading="lazy"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <div className="res-img-overlay"></div>
      </div>
      <div className="res-card-body">
        <h3 className="res-title">{name}</h3>
        <p className="res-cuisines">{cuisines?.join(" • ")}</p>
        <div className="res-meta">
          <StarRating rating={avgRating} />
          <span className="res-time">🕐 {deliveryTime} min</span>
          <span className="res-cost">{costForTwo}</span>
        </div>
        {(locality || city) && (
          <p className="res-locality">📍 {[locality, city].filter(Boolean).join(", ")}</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
