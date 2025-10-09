
import React, { useEffect, useState } from "react";
import axios from "../../../Utils/baseUrl";
import BuyerNavbar from "../BuyerNavBar/BuyerNav";
import BuyerFooter from "../BuyerFooter/BuyerFot";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function CartPage() {
  const [cart, setCart] = useState([]); // ✅ always start with empty array

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/buyers/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ check if backend sends { items: [...] }
        if (res.data && Array.isArray(res.data.items)) {
          setCart(res.data.items);
        } else {
          setCart([]); // fallback to empty array
        }
      } catch (err) {
        console.error("❌ Error fetching cart:", err);
        setCart([]); // avoid undefined crash
      }
    };
    fetchCart();
  }, []);

  const removeFromCart = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/buyers/cart/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(cart.filter((item) => item.bookID._id !== bookId));
    } catch (err) {
      console.error("❌ Error removing book:", err);
    }
  };

  const moveToWishlist = async (bookId) => {
  try {
    const token = localStorage.getItem("token");

    // 1. Add book to wishlist
    await axios.post(
      `/buyers/wishlist/${bookId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // 2. Remove book from cart
    await axios.delete(`/buyers/cart/${bookId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // 3. Update frontend state
    setCart(cart.filter((item) => item.bookID._id !== bookId));

    alert("Book moved to wishlist ✅");
  } catch (err) {
    console.error("❌ Error moving book:", err);
    alert("Failed to move to wishlist ❌");
  }
};


  return (
    <>
      <BuyerNavbar />
      <div className="container my-5">
        <h2 className="text-center mb-4">My Cart</h2>

        <div className="row justify-content-center">
          {cart && cart.length > 0 ? ( // ✅ safe check
            cart.map((item) => (
              <div key={item._id} className="col-md-3 mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:4000${item.bookID.image}`}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{item.bookID.title}</Card.Title>
                    <Card.Text>Author: {item.bookID.author}</Card.Text>
                    <Card.Text>₹{item.bookID.price}</Card.Text>
                    <Card.Text>Qty: {item.quantity}</Card.Text>
                    <Button
  variant="danger"
  onClick={() => removeFromCart(item.bookID._id)}
>
  Remove
</Button>
<Button
  variant="warning"
  className="ms-2"
  onClick={() => moveToWishlist(item.bookID._id)}
>
  Move to Wishlist
</Button>



                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <p className="text-center">Your Cart is Empty</p>
          )}
        </div>
      </div>
      <BuyerFooter />
    </>
  );
}

export default CartPage;
