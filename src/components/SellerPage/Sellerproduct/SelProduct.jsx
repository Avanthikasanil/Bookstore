import React, { useState, useEffect } from "react";
import axios from "../../../Utils/baseUrl.js";
import SelNavbar from "../SellerNavbar/SelNavbar";
import SelFooter from "../SellerFooter/SelFooter";
import SellerCard from "./SelproCard";
import "./SelProduct.css";
import AddDrawer from "./SellerModal";
import EditDrawer from "../EditDrawer/EditDrawer.jsx"; // Correct import

function SellerProduct() {
  const [showModal, setShowModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [products, setProducts] = useState([]);

  // Fetch seller books
  useEffect(() => {
    const fetchSellerBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("/books/mybooks", {
          headers: { Authorization: `Bearer ${token}`, "Cache-Control": "no-cache" },
        });

        if (Array.isArray(res.data)) setProducts(res.data);
      } catch (error) {
        console.error("Error fetching seller books:", error.response?.data || error.message);
      }
    };
    fetchSellerBooks();
  }, []);

  // Delete a book
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/sellers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((book) => book._id !== id));
      alert("Book deleted successfully!");
    } catch (error) {
      console.error("Error deleting book:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error deleting book");
    }
  };

  // Open edit modal
  const handleEditClick = (book) => {
    setSelectedBook(book);
    setEditModalOpen(true);
  };

  return (
    <div>
      <SelNavbar />

      <div className="selproduct">
        <button onClick={() => setShowModal(true)}>ADD PRODUCT</button>
      </div>

      <AddDrawer
        open={showModal}
        onClose={() => setShowModal(false)}
        products={products}
        setProducts={setProducts}
      />

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {products.length > 0 ? (
          products.map((book) => (
            <SellerCard
              key={book._id}
              {...book}
              onDelete={handleDelete}
              onEdit={() => handleEditClick(book)}
            />
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>

      {editModalOpen && selectedBook && (
        <EditDrawer
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          product={selectedBook}
          setProducts={setProducts}
        />
      )}

      <SelFooter />
    </div>
  );
}

export default SellerProduct;
