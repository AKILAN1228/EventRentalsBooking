import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Component & Page Imports
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Products from './pages/Products';
import Booking from './pages/Booking';
import UserLogin from './pages/UserLogin';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Contact from './pages/Contact'; // <--- New Import
import MyBookings from './pages/MyBookings'; 

// Create a theme for Material-UI
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' }, // Blue
    secondary: { main: '#d32f2f' }, // Red
  },
  typography: { fontFamily: 'Roboto, sans-serif' },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <main>
          <Routes>
            {/* Default path loads the LandingPage (Login Selector) */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Main Navigation Routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> {/* <--- New Contact Route */}
            <Route path="/categories" element={<Categories />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            
            {/* Functional Routes */}
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/products/:eventType" element={<Products />} />
            <Route path="/booking/:eventType" element={<Booking />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;