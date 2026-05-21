import { useEffect, useState } from "react";
import { MENU_API_URL, USE_LIVE_SWIGGY_API } from "./constants";
import { createFallbackMenu } from "./fallbackMenuData";

const withNoCache = (url) => {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}_=${Date.now()}`;
};

const parseJsonSafely = async (response) => {
  const responseText = await response.text();

  if (!responseText.trim()) {
    throw new Error("Menu response was empty.");
  }

  try {
    return JSON.parse(responseText);
  } catch {
    throw new Error("Menu response was not valid JSON.");
  }
};

const useRestaurantMenu = (resId) => {
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");

      if (!USE_LIVE_SWIGGY_API) {
        setMenu(createFallbackMenu(resId));
        setError("");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(withNoCache(MENU_API_URL + resId), {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch menu. Status: ${response.status}`);
        }

        const data = await parseJsonSafely(response);
        setMenu(data?.data?.cards ?? []);
        setError("");
      } catch (fetchError) {
        console.warn("Failed to load restaurant menu. Using fallback data.");
        setMenu(createFallbackMenu(resId));
        setError("");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [resId]);

  return { menu, error, isLoading };
};

export default useRestaurantMenu;
