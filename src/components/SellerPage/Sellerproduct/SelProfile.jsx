import React from "react";
import "./SelProfile.css";

function SellerProfileDrawer({ open, onClose }) {
  if (!open) return null;

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="overlay" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="closeBtn" onClick={onClose} aria-label="Close Profile Drawer">
          ✖
        </button>

        {/* Profile Header */}
        <div className="profileHeader">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Profile"
            className="profileImg"
          />
          <h2 className="profileName">{user?.name || "Seller Name"}</h2>
          <p className="profileUsername">@{user?.username || "username"}</p>
          <button className="btn updatePhotoBtn">Update Profile Photo</button>
        </div>

        {/* Profile Details */}
        <div className="profileDetails">
          <div className="profileField">
            <span className="label">Email:</span>
            <span className="value">{user?.email || "N/A"}</span>
          </div>
          <div className="profileField">
            <span className="label">Gender:</span>
            <span className="value">{user?.gender || "N/A"}</span>
          </div>
          <div className="profileField">
            <span className="label">Role:</span>
            <span className="value">{user?.role || "Seller"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerProfileDrawer;
