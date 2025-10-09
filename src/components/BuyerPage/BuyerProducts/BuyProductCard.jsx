import React from "react";
import "./BuyProduct.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "../../../Utils/baseUrl";
import cart from "./images/cartphot-removebg-preview.png";
import heart from "./images/heartphoto.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookCard({ id, image, title, author, price, description }) {
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return;
      }

      await axios.post(
        `/buyers/cart/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(" Book added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Book already in cart or something went wrong");
    }
  };

  const handleAddWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return;
      }

      await axios.post(
        `/buyers/wishlist/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(" Book added to wishlist!");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Book already in wishlist");
    }
  };

  return (
    <>
      <Card className="book-card">
        <Card.Img
          variant="top"
          src={image || "https://via.placeholder.com/150"}
          alt={title}
          className="book-image"
        />
        <Card.Body>
          <Card.Title className="book-title">{title}</Card.Title>
          <p className="book-description">{description}</p>
          <p className="book-author">Author: {author}</p>
          <p className="book-price">Price: ₹{price}</p>
          <div className="book-buttons">
            <Button variant="success" className="me-2" onClick={handleAddToCart}>
              Add to Cart <img className="icon" src={cart} alt="cart" />
            </Button>
            <Button variant="outline-danger" onClick={handleAddWishlist}>
              Wishlist <img className="icon" src={heart} alt="wishlist" />
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Toast Container (once per page, not per card ideally) */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default BookCard;
