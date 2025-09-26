import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookLogo from "./Images/bookstore.png";
import profile from "./Images/profilelog.png";
import "./SelNav.css";
import SellerProfileDrawer from "../Sellerproduct/SelProfile";

function SellerNaveBar() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="seller-navbar">
      {/* Left - Logo */}
      <div className="seller-nav-left">
        <div className="seller-logo">
          <img src={BookLogo} alt="logo" />
        </div>
      </div>

      {/* Right - Nav links */}
      <div className={`seller-nav-right ${isOpen ? "active" : ""}`}>
        <a href="#">Home</a>
        <a href="#">Contact Us</a>
      </div>

      {/* Profile + Logout */}
      <div className="seller-nav-icons">
        <img
          className="seller-profile"
          src={profile}
          alt="profile"
          onClick={() => setShowProfile(true)}
        />
        <button onClick={handleLogout} className="seller-logout-btn">
          Logout
        </button>
      </div>

      {/* Hamburger */}
      <div className="seller-hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Profile Drawer */}
      <SellerProfileDrawer
        open={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </div>
  );
}

export default SellerNaveBar;
