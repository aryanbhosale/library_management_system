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
        const response = await axios.get("http://localhost:3000/libraryTransactions", {
          params: { user: user._id }, // Pass the user ID as a query parameter
          withCredentials: true,
        });
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, [user]); // Fetch transactions when the user changes

  return (
    <div>
      <nav className="flex justify-between items-center bg-gray-800 text-white p-4">
        <div>
          <h2 className="text-lg font-semibold">
            {user.role === "admin" ? `${user.role}` : `${user.name}`} - Your Transactions
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-300">
            Books
          </Link>
          <Link to="/transactions" className="hover:text-gray-300">
            Transactions
          </Link>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
            Logout
          </button>
        </div>
      </nav>
      {/* Display Transactions */}
      <div className="container mx-auto mt-8 md:px-6">
        <h2 className="text-2xl font-semibold mb-4">Your Transactions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {transactions.map((transaction) => (
            <div key={transaction._id} className="border p-4 rounded-md mb-4">
              <p>Book: {transaction.book.name}</p>
              <p>Type: {transaction.transactionType}</p>
              <p>Date: {transaction.dueDate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
