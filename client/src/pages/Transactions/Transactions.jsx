import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Transaction = ({ user, onLogout }) => {
  const [transactions, setTransactions] = useState([]);

  const handleLogout = () => {
    onLogout();
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "librarymanagementsystem-production-9b04.up.railway.app/libraryTransactions",
          {
            params: { user: user._id }, // Pass the user ID as a query parameter
            withCredentials: true,
          }
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, [user]); // Fetch transactions when the user changes

  // Function to format date to IST
  const formatDateToIST = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });
  };

  const approveBookRequest = async (transactionId) => {
    try {
      await axios.put(
        "librarymanagementsystem-production-9b04.up.railway.app/libraryTransactions/approveBookRequest",
        {
          transactionId: transactionId,
        },
        {
          withCredentials: true,
        }
      );
      // After successfully approving, update the transactions list
      const updatedTransactions = transactions.map((transaction) =>
        transaction._id === transactionId
          ? { ...transaction, transactionType: "approved" }
          : transaction
      );
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error("Error approving book request:", error);
    }
  };

  const returnBook = async (userId, bookId) => {
    try {
      const response = await axios.put(
        "librarymanagementsystem-production-9b04.up.railway.app/libraryTransactions/returnBook",
        {
          user: userId,
          book: bookId,
          transactionType: "returned",
        },
        {
          withCredentials: true,
        }
      );
      // Handle the returned book data as needed after a successful return
      // Update the transactions after book return
      const updatedTransactions = transactions.map((transaction) =>
        transaction.user._id === userId && transaction.book._id === bookId
          ? { ...transaction, transactionType: "returned" }
          : transaction
      );
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };


  return (
    <div>
      <nav className="flex justify-between items-center bg-gray-800 text-white p-4">
        <div>
          <h2 className="text-lg font-semibold">
            {user.role === "admin" ? `Admin - All Transactions` : `${user.name} - Your Transactions`} 
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
      {/* Display Transactions */}
      <div className="container mx-auto mt-8 md:px-6">
        <h2 className="text-2xl font-semibold mb-4">{user.role === "admin" ? "All Transactions" : "Your Transactions"}</h2>
        {transactions.length === 0 ? ( // Check if transactions array is empty
        <div className="flex flex-col items-center justify-center h-screen overflow-y-hidden">
          <p className="text-4xl text-gray-500">
            You have not made any transactions yet!
          </p>
          <p className="text-lg text-gray-500 mt-4">
            Borrow a book to view transaction status.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="border rounded-md mb-4 shadow-md p-6 flex flex-col"
            >
              <p className="text-lg font-semibold mb-2">
                Book: {transaction.book.name}
              </p>
              <p className="text-gray-600">
                Type: {transaction.transactionType}
              </p>

              {user.role === "admin" && (
                <>
                  <div className="mt-2">
                    <p className="text-gray-600">
                      User: {transaction.user.name}
                    </p>
                    <p className="text-gray-600">
                      Email: {transaction.user.email}
                    </p>
                  </div>
                </>
              )}
              <p className="text-gray-600 mt-2">
                Due Date: {formatDateToIST(transaction.dueDate)}
              </p>
              {user.role === "user" &&
                transaction.transactionType !== "returned" &&
                new Date(transaction.dueDate) < new Date() && (
                  <button
                    onClick={() =>
                      returnBook(transaction.user._id, transaction.book._id)
                    }
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded self-start"
                  >
                    Return Book
                  </button>
                )}
              {user.role === "admin" &&
                transaction.transactionType !== "approved" &&
                transaction.transactionType !== "returned" && (
                  <button
                    onClick={() => approveBookRequest(transaction._id)}
                    className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded self-start"
                  >
                    Approve Request
                  </button>
                )}
            </div>
          ))}
        </div>
      )}
        
      </div>
    </div>
  );
};

export default Transaction;
