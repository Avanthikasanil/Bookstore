import React from "react";
import './Footer.css';
import logo from './images/bookstore.png';
import email from './images/email-Photoroom.png';
import faceb from './images/facebook (2)-Photoroom.png';
import insta from './images/instagram-Photoroom.png';
import telegram from './images/telegram-Photoroom.png';

function Footer() {
  return (
    <div className="footer">
      <div className="logo-fot">
        <img src={logo} alt="logo" />
      </div>
      <div className="fot-list">
        <a href="#">About Us</a>
        <a href="#">Services</a>
        <a href="#">Contact Us</a>
      </div>
      <div className="icon-fot">
        <img src={email} alt="email" />
        <img src={faceb} alt="facebook" />
        <img src={insta} alt="instagram" />
        <img src={telegram} alt="whatsapp" />
      </div>
      <p style={{color: "white"}} >Copyright ©2025; Designed by avanthika</p>
    </div>
  );
}

export default Footer;