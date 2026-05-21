import { baseURL } from "../utils/constants";

const MenuItem = ({ data, brandName }) => {
  const { name, price, description, ratings, imageId } = data;
  return (
    <div className="menu-item-card">
      <div className="menu-item-card-desc">
        <p>{brandName}</p>
        <h1>{name}</h1>
        <p>Price: ₹{price / 100}</p>
        <p>
          ⭐️ {ratings.aggregatedRating.rating} (
          {ratings.aggregatedRating.ratingCount})
        </p>
        <p>{description}</p>
      </div>
      <div>
        <img
          src={`${baseURL}${imageId}`}
          alt={name}
          className="menu-item-image"
        />
      </div>
    </div>
  );
};

export default MenuItem;