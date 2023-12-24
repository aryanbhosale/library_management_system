import React from "react";
import { Link } from "react-router-dom";

const Library = ({ user, onLogout }) => {
  const handleLogout = () => {
    // Call the logout function passed from the parent component
    onLogout();
  };

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>This is the library page.</p>
      <button onClick={handleLogout}>Logout</button>
      {/* Other library content */}
    </div>
  );
};

export default Library;
