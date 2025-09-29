
import React from "react";
import './SelProduct.css';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function SellerCard({ _id, image, title, author, price, description, onDelete, onEdit }) {
  return (
    <Card className="seller-card">
      <Card.Img
        className="seller-book-image"
        variant="top"
        src={`http://localhost:4000${image}`}
        alt={title}
      />
      <Card.Body>
        <Card.Title className="seller-book-title">{title}</Card.Title>
        <p className="seller-book-description">{description}</p>
        <p className="seller-book-author">Author: {author}</p>
        <p className="seller-book-price">Price: ₹{price}</p>
        <div className="seller-book-buttons">
          <Button variant="primary" className="me-2" onClick={() => onEdit(_id)}>
            Update
          </Button>
          <Button variant="danger" onClick={() => onDelete(_id)}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default SellerCard;
