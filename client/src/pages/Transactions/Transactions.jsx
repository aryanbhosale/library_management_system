import React from "react";
import { Link } from "react-router-dom";

const Transaction = ({ user, onLogout }) => {
  const handleLogout = () => {
    // Call the logout function passed from the parent component
    onLogout();
  };

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
      {/* Other Transaction content */}
    </div>
  );
};

export default Transaction;
