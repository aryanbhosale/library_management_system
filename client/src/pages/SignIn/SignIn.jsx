import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const SignIn = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="font-serif text-5xl text-center mb-8">Library Management System</h1>
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-xs w-full space-y-4">
        <h2 className="text-3xl font-semibold text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Sign In
          </button>
          <div className="w-full text-blue-500 text-center py-2 rounded-lg hover:underline focus:outline-none">
            <Link to="/signup">Go to Sign Up</Link>
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
