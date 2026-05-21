import { groceryList } from "../utils/mockData";
import { baseURL } from "../utils/constants";

const GroceryItem = ({ item }) => {
  return (
    <div className="res-card">
      <div className="res-img-container">
        <img
          className="res-logo"
          src={baseURL + item.imgId}
          alt={item.name}
        />
        <div className="res-img-overlay"></div>
      </div>
      <div className="res-card-body">
        <h3 className="res-title">{item.name}</h3>
        <p className="res-cuisines">{item.description}</p>
        <div className="res-meta">
          <span className={`rating-badge ${item.rating >= 4.5 ? "rating-green" : "rating-yellow"}`}>
            ⭐ {item.rating}
          </span>
          <span className="res-cost">₹{item.price}</span>
        </div>
        <button className="add-btn" style={{ position: "static", transform: "none", width: "100%", marginTop: "10px" }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const Grocery = () => {
  return (
    <div className="page-container">
      <section className="hero-section" style={{ background: "none", padding: "0 0 40px" }}>
        <h1 className="page-title">Instamart Grocery 🛒</h1>
        <p className="page-subtitle">Fresh essentials delivered to your doorstep in minutes.</p>
      </section>

      <div className="res-container">
        {groceryList.map((item) => (
          <GroceryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Grocery;
