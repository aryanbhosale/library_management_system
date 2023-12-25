import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Library from "./pages/Library/Library";
import Transactions from "./pages/Transactions/Transactions";
import { loginAPI } from "./api";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

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
      toast.error("Invalid username or password!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`https://librarymanagementsystem-production-9b04.up.railway.app/logout`, {
        withCredentials: true, // Ensure credentials are included in the request
      });
  
      // Clear the user data in localStorage or state
      localStorage.removeItem('user');
      setUser(null);
  
      // Clear cookies related to the session
      document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
      // Redirect or navigate the user to the login/sign-in page
      navigate('/signin', { replace: true });
    } catch (error) {
      toast.error("Logout failed.", {
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
        <Route path="/transactions" element={<Transactions user={user} onLogout={handleLogout} />} />
      </Routes>
    );
  }
}

export default App;
