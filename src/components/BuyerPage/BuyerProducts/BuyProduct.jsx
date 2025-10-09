import React, { useEffect, useState } from "react";
import axios from '../../../Utils/baseUrl';
import BuyerNavbar from "../BuyerNavBar/BuyerNav";
import BuyerFooter from "../BuyerFooter/BuyerFot";
import BuyerCard from "./BuyProductCard";
import Pagination from "react-bootstrap/Pagination"; 
import "./BuyProduct.css"; // ✅ add new CSS file

function ProductPage() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("/buyers/getAllBooks");
        setBooks(res.data);
      } catch (error) {
        console.error("❌ Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  // ✅ Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  // ✅ React-Bootstrap Pagination items
  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)} // ✅ Change page
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <BuyerNavbar />

      <div className="container my-5">
        <div className="book-grid">
          {currentBooks.length > 0 ? (
            currentBooks.map((book) => (
              <div key={book._id} className="book-column">
                <BuyerCard
                  id={book._id}
                  title={book.title}
                  author={book.author}
                  price={book.price}
                  description={book.description}
                  image={
                    book.image
                      ? `http://localhost:4000${book.image}`
                      : "/default-book.png"
                  }
                />
              </div>
            ))
          ) : (
            <p className="text-center">No books available yet</p>
          )}
        </div>

        {/* ✅ Pagination Component */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.Prev
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              />
              {items}
              <Pagination.Next
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        )}
      </div>

      <BuyerFooter />
    </>
  );
}

export default ProductPage;
