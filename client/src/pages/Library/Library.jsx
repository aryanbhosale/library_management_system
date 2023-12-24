import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Library = ({ user, onLogout }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    // Call the logout function passed from the parent component
    onLogout();
  };

  const handleRequestBook = async () => {
    if (!selectedBook || !user || user.role === "admin") return;

    try {
      const response = await axios.post(
        "http://localhost:3000/libraryTransactions/requestBook",
        {
          user: user._id,
          book: selectedBook._id,
          transactionType: "borrowed",
        },
        {
          withCredentials: true, // Include credentials in the request
        }
      );
      console.log("Request successful:", response.data);
      // Update the availability status locally upon successful request
      const updatedBooks = books.map((book) =>
        book._id === selectedBook._id
          ? { ...book, currentAvailabilityStatus: false }
          : book
      );
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error requesting book:", error);
      // Handle error cases if needed
    }
    // Close the modal after request
    setShowModal(false);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/books", {
          withCredentials: true,
        });
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    // Apply filter on books based on selected filter option
    if (filter === "available") {
      setFilteredBooks(books.filter((book) => book.currentAvailabilityStatus));
    } else if (filter === "notAvailable") {
      setFilteredBooks(books.filter((book) => !book.currentAvailabilityStatus));
    } else {
      setFilteredBooks(books); // Show all books if 'all' is selected
    }
  }, [books, filter]);

  return (
    <div>
      <nav className="flex justify-between items-center bg-gray-800 text-white p-4">
        <div>
          <h2 className="text-lg font-semibold">
            Welcome, {user.role === "admin" ? `${user.role}` : `${user.name}`}!
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-300">
            Books
          </Link>
          <Link to="/transactions" className="hover:text-gray-300">
            Transactions
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </nav>
      {/* Other library content */}
      <div className="container mx-auto mt-8 px-4 md:px-6">
        <h2 className="text-2xl font-semibold mb-4">All Books</h2>
        <div className="flex space-x-4 mb-4">
        <button
            onClick={() => setFilter("all")}
            className={`border px-4 py-2 rounded ${
              filter === "all" ? "bg-gray-200" : ""
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("available")}
            className={`border px-4 py-2 rounded ${
              filter === "available" ? "bg-gray-200" : ""
            }`}
          >
            Available
          </button>
          <button
            onClick={() => setFilter("notAvailable")}
            className={`border px-4 py-2 rounded ${
              filter === "notAvailable" ? "bg-gray-200" : ""
            }`}
          >
            Out of Stock
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map((book) => (
            <div key={book._id} className="border p-4 rounded-md">
              <h3 className="text-lg font-semibold">{book.name}</h3>
              <p className="text-sm text-gray-500">{book.author}</p>
              <p>
                {book.currentAvailabilityStatus ? "Available" : "Not Available"}
              </p>
              {book.currentAvailabilityStatus && (
                <button
                  onClick={() => {
                    setSelectedBook(book);
                    setShowModal(true);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-2"
                >
                  Request Book
                </button>
              )}
            </div>
          ))}
        </div>
        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                        Request Borrowing: {selectedBook.name}
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">Do you want to request borrowing this book?</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleRequestBook}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Request
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
