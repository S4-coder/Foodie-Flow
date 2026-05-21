import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { brandLogo } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";

const LOGGED_IN_USER = "Sabeel Ahmed";
const LOGIN_STORAGE_KEY = "foodrushLoggedInUser";

const Header = ({ searchText, setSearchText }) => {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return window.localStorage.getItem(LOGIN_STORAGE_KEY) || "";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const isOnline = useOnlineStatus();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogin = () => {
    window.localStorage.setItem(LOGIN_STORAGE_KEY, LOGGED_IN_USER);
    setLoggedInUser(LOGGED_IN_USER);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    window.localStorage.removeItem(LOGIN_STORAGE_KEY);
    setLoggedInUser("");
    setMenuOpen(false);
  };

  return (
    <div className="header">
      <Link to="/" className="logo-link">
        <div className="logo-container">
          <img className="header-logo" src={brandLogo} alt="Brand logo" />
        </div>
      </Link>

      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search restaurants, cuisines, or cities..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {searchText && (
          <button
            className="search-clear"
            onClick={() => setSearchText("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div className="nav-items">
        <ul>
          <li className={`status-badge ${isOnline ? "online" : "offline"}`}>
            <span className="status-dot"></span>
            {isOnline ? "Online" : "Offline"}
          </li>
          <li>
            <Link to="/" className={`nav-pill ${isActive("/") ? "active" : ""}`}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/grocery"
              className={`nav-pill ${isActive("/grocery") ? "active" : ""}`}
            >
              Grocery
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`nav-pill ${isActive("/about") ? "active" : ""}`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`nav-pill ${isActive("/contact") ? "active" : ""}`}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className={`nav-pill ${isActive("/cart") ? "active" : ""}`}
            >
              Cart
            </Link>
          </li>
          {loggedInUser ? (
            <>
              <li className="nav-pill profile-pill">{loggedInUser}</li>
              <li>
                <button className="login-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <button className="login-btn" onClick={handleLogin}>
                Login
              </button>
            </li>
          )}
        </ul>
      </div>
      </div>
  );
};

export default Header;