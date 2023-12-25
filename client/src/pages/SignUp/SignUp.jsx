import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupAPI } from "../../api"; // Import your API functions
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    contactNumber: "",
    role: "user", // Default role
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signupAPI(formData);

      setFormData({
        username: "",
        password: "",
        name: "",
        email: "",
        contactNumber: "",
        role: "user",
      });
    } catch (error) {
      toast.error("Invalid username or password!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
              <h1 className="font-serif text-5xl text-center mb-8">Library Management System</h1>
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-xs w-full space-y-4">
        <h2 className="text-3xl font-semibold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Sign Up
          </button>
          <ToastContainer />
          <div className="w-full text-blue-500 text-center py-2 rounded-lg hover:underline focus:outline-none">
            <Link to="/signin">Go to Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
