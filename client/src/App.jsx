import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Library from "./pages/Library/Library";
import { loginAPI } from "./api";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUser(parsedUserData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await loginAPI(username, password);
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);
      navigate('/'); // Redirect to the home page on successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('/logout');
      localStorage.removeItem('user');
      setUser(null);
      navigate('/signin', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Conditional rendering based on user authentication status
  if (!user) {
    return (
      <Routes>
        <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Navigate to="/signin" replace />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/signin" element={<Navigate to="/" />} />
        <Route path="/signup" element={<Navigate to="/" />} />
        <Route path="/" element={<Library user={user} onLogout={handleLogout} />} />
      </Routes>
    );
  }
}

export default App;
