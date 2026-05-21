const RestaurantMenuInfoCard = ({ menuInfo }) => {
  if (!menuInfo) {
    return <p className="menu-info-unavailable">Restaurant details are unavailable.</p>;
  }

  const {
    name,
    avgRatingString,
    totalRatingsString,
    costForTwoMessage,
    cuisines,
    locality,
  } = menuInfo;

  return (
    <div className="menu-info-card">
      <h1 className="menu-restaurant-name">{name}</h1>
      <div className="menu-info-meta">
        <span className="menu-info-rating">⭐ {avgRatingString}</span>
        <span className="menu-info-sep">·</span>
        <span>{totalRatingsString}</span>
        <span className="menu-info-sep">·</span>
        <span>{costForTwoMessage}</span>
      </div>
      <p className="menu-info-cuisines">{cuisines?.join(" • ")}</p>
      {locality && <p className="menu-info-locality">📍 {locality}</p>}
    </div>
  );
};

export default RestaurantMenuInfoCard;
