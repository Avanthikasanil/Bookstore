import React from "react";
import './BuyerFot.css';
import logo from './Images/bookstore.png';
import email from './Images/email-Photoroom.png';
import faceb from './Images/facebook (2)-Photoroom.png';
import insta from './Images/instagram-Photoroom.png';
import telegram from './Images/telegram-Photoroom.png';

function MainFooter() {
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
    </div>
  );
}

export default MainFooter;