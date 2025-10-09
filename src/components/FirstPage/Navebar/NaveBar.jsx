// import React from "react";
// import './NaveBar.css';
// import logo from './Images/bookstore.png';
// import { Link } from "react-router-dom";

// function NaveBar({onLoginClick}) {
//   return (
//     <div className="navebar">
//       <div className="logo-img">
//         <img src={logo} alt="logo" />
//       </div>
//       <div className="nav-list">
//         <a href="#About-us">About Us</a>
//         <a href="#services">Services</a>
//         <a href="#contact-us">Contact Us</a>
//       </div>
//       <div className="nav-button">
//         <Link to="/register">
//         <button>Register</button>
//         </Link>
//         <button onClick={onLoginClick}>Login</button>
//       </div>
//     </div>
//   );
// }

// export default NaveBar;
import React, { useState } from "react";
import './NaveBar.css';
import logo from './Images/bookstore.png';
import { Link } from "react-router-dom";

function NaveBar({ onLoginClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navebar">
      {/* Logo */}
      <div className="logo-img">
        <img src={logo} alt="logo" />
      </div>

      {/* Menu */}
      <div className={`nav-list ${menuOpen ? "active" : ""}`}>
        <a href="#About-us">About Us</a>
        <a href="#services">Services</a>
        <a href="#contact-us">Contact Us</a>
      </div>

      {/* Buttons + Hamburger */}
      <div className="nav-right">
        <div className="nav-button">
          <Link to="/register">
            <button>Register</button>
          </Link>
          <button onClick={onLoginClick}>Login</button>
        </div>

        {/* Hamburger (only for mobile) */}
        <div 
          className={`hamburger ${menuOpen ? "open" : ""}`} 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default NaveBar;
