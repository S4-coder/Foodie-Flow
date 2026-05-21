const Contact = () => {
  return (
    <div className="page-container contact">
      <h1 className="page-title">Contact Us</h1>
      <p className="page-subtitle">We'd love to hear from you.</p>
      <div className="contact-info">
        <div className="contact-item">
          <span className="contact-icon">✉️</span>
          <div>
            <h4>Email</h4>
            <a href="mailto:sabeel2311@gmail.com">sabeel2311@gmail.com</a>
          </div>
        </div>
        <div className="contact-item">
          <span className="contact-icon">📞</span>
          <div>
            <h4>Phone</h4>
            <a href="tel:+917337281344">+91 7337281344</a>
          </div>
        </div>
        <div className="contact-item">
          <span className="contact-icon">📍</span>
          <div>
            <h4>Address</h4>
            <p>Old Malakpet Ajanta Colony Hyderabad</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
