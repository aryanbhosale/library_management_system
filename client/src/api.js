import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Replace with your backend API URL

export const loginAPI = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username,
      password,
    }, {
      withCredentials: true, // Ensure credentials are included in the request
    });

    // Extract and handle the received cookie
    const receivedCookie = response.headers['set-cookie'];

    // Process the cookie if needed
    // For example, you can set it in local storage or handle it based on your requirements

    console.log("RESPONSE: ", response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
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

    return response.data; // Return the response data
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message || 'Signup failed');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from the server');
    } else {
      // Something happened in setting up the request that triggered an error
      throw new Error('Error in making the request');
    }
  }
};

// Other API functions for interacting with your backend...
