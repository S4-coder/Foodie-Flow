import { useParams } from "react-router-dom";
import RestaurantMenuInfoCard from "./RestaurantMenuInfoCard.jsx";
import MenuItem from "./MenuItem.jsx";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const getRestaurantInfo = (menu) =>
  menu.find((card) => card?.card?.card?.info)?.card?.card?.info;

const getMenuItems = (menu) => {
  const regularCards =
    menu.find((card) => card?.groupedCard?.cardGroupMap?.REGULAR)?.groupedCard
      ?.cardGroupMap?.REGULAR?.cards ?? [];
  for (const card of regularCards) {
    const itemCards = card?.card?.card?.itemCards;
    if (Array.isArray(itemCards) && itemCards.length > 0) {
      return itemCards;
    }
  }
  return [];
};

const MenuSkeleton = () => (
  <div className="menu-loading">
    <div className="menu-skeleton-header shimmer-animate"></div>
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="menu-skeleton-item shimmer-animate"></div>
    ))}
  </div>
);

const RestaurantMenu = () => {
  const { resId } = useParams();
  const { menu, error, isLoading } = useRestaurantMenu(resId);

  if (isLoading) return <MenuSkeleton />;

  if (error) {
    return (
      <div className="menu-error">
        <p>⚠️ {error}</p>
      </div>
    );
  }

  const menuInfo = getRestaurantInfo(menu);
  const menuItemList = getMenuItems(menu);

  return (
    <div className="menu-page">
      <RestaurantMenuInfoCard menuInfo={menuInfo} />
      <section className="menu-section">
        <h2 className="menu-heading">Menu</h2>
        {menuItemList.length === 0 ? (
          <p className="menu-empty">No menu items available right now.</p>
        ) : (
          <div className="menu-list">
            {menuItemList.map((menuItem) => (
              <MenuItem key={menuItem.card.info.id} data={menuItem.card.info} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default RestaurantMenu;
