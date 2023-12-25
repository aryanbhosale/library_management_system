import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = "http://localhost:3000"; // Replace with the backend API URL

export const loginAPI = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username,
      password,
    }, {
      withCredentials: true, // Ensure credentials are included in the request
    });

    // Extract and handle the received cookie if needed
    const receivedCookie = response.headers['set-cookie'];
    return response.data;
    
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

// This function makes a POST request to the signup endpoint using Axios
export const signupAPI = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    toast.success("Signup successful!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    return response.data; // Return the response data
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      toast.error("Signup failed. All fields are required!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } else if (error.request) {
      // The request was made but no response was received
      toast.error("No response received from the server.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } else {
      // Something happened in setting up the request that triggered an error
      toast.error('Error in making the request', {
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
  }
};