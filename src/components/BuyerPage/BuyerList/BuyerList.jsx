import React, { useEffect, useState } from "react";
import axios from "../../../Utils/baseUrl";
import BuyerNavbar from "../BuyerNavBar/BuyerNav";
import BuyerFooter from "../BuyerFooter/BuyerFot";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/buyers/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist(res.data.books || []); // safe fallback
      } catch (err) {
        console.error("❌ Error fetching wishlist:", err);
      }
    };
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/buyers/wishlist/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist((prev) => prev.filter((book) => book._id !== bookId));
      console.log("✅ Book removed from wishlist");
    } catch (err) {
      console.error("❌ Error removing book:", err);
    }
  };

  const moveToCart = async (bookId) => {
  console.log("Moving book to cart:", bookId);
  try {
    const token = localStorage.getItem("token");

    // ✅ Pass bookId in the URL, not body
    await axios.post(
      `/buyers/cart/${bookId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Remove from wishlist
    await axios.delete(
      `/buyers/wishlist/${bookId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setWishlist((prev) => prev.filter((book) => book._id !== bookId));
    console.log("✅ Book moved to cart successfully");
  } catch (err) {
    console.error("❌ Error moving book to cart:", err);
    alert("Failed to move book to cart");
  }
};


  return (
    <>
      <BuyerNavbar />
      <div className="container my-5">
        <h2 className="text-center mb-4">My Wishlist</h2>

        <div className="row justify-content-center">
          {wishlist.length > 0 ? (
            wishlist.map((book) => (
              <div key={book._id} className="col-md-3 mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:4000${book.image}`}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>{book.author}</Card.Text>
                    <Card.Text>₹{book.price}</Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => removeFromWishlist(book._id)}
                    >
                      Remove
                    </Button>
                    <Button
                      variant="success"
                      className="ms-2"
                      onClick={() => moveToCart(book._id)}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <p className="text-center">Wishlist is Empty</p>
          )}
        </div>
      </div>
      <BuyerFooter />
    </>
  );
}

export default WishlistPage;
