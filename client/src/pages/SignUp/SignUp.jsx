import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { signupAPI } from "../../api"; // Import your API functions

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
      // Make API call for signup with form data
      const response = await signupAPI(formData);
      console.log("Signup successful:", response);
      // Redirect to SignIn or handle success as needed

      // Clear form fields after successful signup
      setFormData({
        username: "",
        password: "",
        name: "",
        email: "",
        contactNumber: "",
        role: "user",
      });

      // Show success alert
      alert("Signup successful");

      // Redirect to Sign In page after successful signup
      navigate('/'); // Redirect to the home page on successful login
    } catch (error) {
      console.error("Signup failed:", error);
      // Handle signup failure (e.g., show error to user)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
