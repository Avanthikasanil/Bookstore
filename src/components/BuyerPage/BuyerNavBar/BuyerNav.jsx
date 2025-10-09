// MainNaveBar.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BookLogo from "./images/bookstore.png";
import heartIcon from "./images/heart (2).png";
import cartIcon from "./images/cart.png";
import "./BuyerNav.css";

function MainNaveBar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="navbar">
      {/* Left - Logo */}
      <div className="nav-left">
        <div className="logo">
          <img src={BookLogo} alt="logo" />
        </div>
      </div>

      {/* Right section */}
      <div className="nav-right">
        {/* Desktop links */}
        <div className="nav-links-desktop">
          <Link to="/">Home</Link>
          <Link to="/language">Language</Link>
        </div>

        {/* Hamburger (mobile only) */}
        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          &#9776;
        </div>

        {/* Mobile dropdown */}
        <div className={`dropdown ${menuOpen ? "show" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/language">Language</Link>
        </div>

        {/* Wishlist */}
        <Link to="/wishlist" className="nav-link">
          <img src={heartIcon} alt="wishlist" className="icon1" />
        </Link>

        {/* Cart */}
        <Link to="/cart" className="nav-link">
          <img src={cartIcon} alt="cart" className="icon2" />
        </Link>

        {/* Logout */}
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}

export default MainNaveBar;
