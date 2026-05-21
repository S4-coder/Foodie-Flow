const About = () => {
  return (
    <div className="page-container about">
      <h1 className="page-title">About Us</h1>
      <p className="page-subtitle">
        We connect hungry people with the best local restaurants — fast,
        fresh, and right to your door.
      </p>
      <div className="about-cards">
        <div className="about-card">
          <span className="about-icon">🍽️</span>
          <h3>500+ Restaurants</h3>
          <p>Curated local favourites and popular chains.</p>
        </div>
        <div className="about-card">
          <span className="about-icon">⚡</span>
          <h3>30 min Delivery</h3>
          <p>Lightning fast delivery to your doorstep.</p>
        </div>
        <div className="about-card">
          <span className="about-icon">💯</span>
          <h3>Quality First</h3>
          <p>We partner only with restaurants we trust.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
