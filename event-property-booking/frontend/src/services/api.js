// import axios from 'axios';

// const API = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
// });

// // Add token to requests
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// export default API;
const API_BASE = 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('userToken');
};

// API service
export const apiService = {
  // Auth endpoints
  register: async (userData) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return await response.json();
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return await response.json();
  },

  // Booking endpoints
  createBooking: async (bookingData) => {
    const response = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(bookingData)
    });
    return await response.json();
  },

  getUserBookings: async (email) => {
    const response = await fetch(`${API_BASE}/bookings/my-bookings?email=${email}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    return await response.json();
  },

  getAllBookings: async () => {
    const response = await fetch(`${API_BASE}/bookings/admin/all`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    return await response.json();
  }
};

// Save user data after login/register
export const saveUserData = (userData) => {
  if (userData.token) {
    localStorage.setItem('userToken', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));
  }
};

// Remove user data on logout
export const removeUserData = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('user');
};