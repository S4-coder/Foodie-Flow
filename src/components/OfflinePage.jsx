const OfflinePage = () => {
  return (
    <div className="page-container offline-page">
      <span className="offline-icon">📡</span>
      <h2 className="page-title">You're Offline</h2>
      <p>Please check your internet connection and try again.</p>
      <button className="filter-btn filter-btn-active" onClick={() => window.location.reload()}>
        Retry
      </button>
    </div>
  );
};

export default OfflinePage;
