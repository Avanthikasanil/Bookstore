import react from "react";
import './Body.css';
import books from './images/bookstore-removebg-preview.png';
import shop from './images/online-removebg-preview.png';
import seller from './images/seller-removebg-preview.png';
import wishlist from './images/wishlist-removebg-preview.png';
import category from './images/category-removebg-preview.png';


function Body() {
    return (
        <div className="body-container">
            <div id="About-us" className="about-us">
                <div className="about-head">
                    <h1>ABOUT-US</h1>
                </div>
                <div className="about-img2">
                    <img src={books} alt="pages" />
                    <div className="about-para">
                        <p>Welcome to Book Store your friendly neighborhood book haven!
                            We're passionate about bringing stories to life and connecting readers with the books they love.
                            Whether you're a casual reader, a curious student, or a dedicated bookworm, our store is designed just for you.
                            From timeless classics to trending titles, academic materials to children’s stories – we offer a wide range of
                            books to suit every taste and age. Our mission is simple:
                            Make reading easy, affordable, and joyful.
                            We also support local sellers by giving them a space to showcase their books. And for our buyers
                            we ensure a smooth browsing, wishlist, and buying experience.
                            So grab a cup of coffee, explore our collection, and let your next adventure begin with a book!</p>
                             <button className="about-but">Login to know more about us</button>
                    </div>
                </div>
            </div>

            {/* SERVICES */}
            <div id="services" className="service">
                <h1>OUR SERVICES</h1>
                <div className="all-service">
                    <div className="ser-1">
                        <img src={shop} alt="shopping" />
                        <p>Online Book Shopping</p>
                    </div>
                    <div className="ser-1">
                        <img src={seller} alt="seller" />
                        <p>Seller Portal</p>
                    </div>
                    <div className="ser-1">
                        <img src={wishlist} alt="wishlist" />
                        <p>Wishlist Feature</p>
                    </div>
                    <div className="ser-1">
                        <img src={category} alt="Category" />
                        <p>Category Browsing</p>
                    </div>
                </div>
            </div>

            {/* CONTACT-US */}

            <div id="contact-us" className="contact-us">
                <h1>CONTACT US</h1>
                <div className="map">
                        <iframe
                            title="Bookstore Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.899041716801!2d75.78042917488513!3d11.258753048340206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65c43f62f377d%3A0x7ad8c84dbe50af0e!2sCalicut%2C%20Kerala!5e0!3m2!1sen!2sin!4v1698052764873!5m2!1sen!2sin"
                            width="80%"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                <div className="contact">
                <div className="form">
                <form className="contact-form">
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Your Email" required />
                    <textarea placeholder="Your Message" rows="4" required></textarea>
                    <button>Send Message</button>
                </form>
                </div>
                <div className="contact-details">
                        <p><b>Email:</b> books@bookstore.com</p>
                        <p><b>Phone:</b> +91 76634 43210</p>
                        <p><b>Address:</b> Book Street, Calicut, Kerala</p>
                </div>
                </div>
            </div>
        </div>


    );
}
export default Body;