// src/components/common/Navbar.js (FINAL CORRECTED VERSION)

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon, // <-- Import ListItemIcon
  Divider, // <-- Import Divider
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { googleLogout } from '@react-oauth/google';
import Logout from '@mui/icons-material/Logout'; // <-- Import icons
import BookmarksIcon from '@mui/icons-material/Bookmarks'; // <-- Import icons

const Navbar = () => {
  const navigate = useNavigate();
  // We now have TWO menus: one for the cart, one for the user
  const [cartMenuAnchorEl, setCartMenuAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null); // <-- New state for user menu
  
  const [user, setUser] = useState(null);
  const [pendingItems, setPendingItems] = useState(0);

  // Load user info & calculate pending bookings
  useEffect(() => {
    const loadData = () => {
      const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
      setUser(savedUser);

      if (savedUser) {
        // If user is logged in, check their pending bookings
        const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const userPendingBookings = allBookings.filter(
          (booking) => booking.userEmail === savedUser.email && booking.status === 'Pending'
        );
        setPendingItems(userPendingBookings.length);
      } else {
        // If user is not logged in, count is 0
        setPendingItems(0);
      }
    };
    loadData();
    
    // Listen for changes
    const handleStorageChange = () => loadData();
    const handleLoginSuccess = () => loadData();
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('loginSuccess', handleLoginSuccess);

    // Cleanup listeners
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('loginSuccess', handleLoginSuccess);
    };
  }, []);


  // Cart Menu Handlers
  const handleCartMenuOpen = (event) => setCartMenuAnchorEl(event.currentTarget);
  const handleCartMenuClose = () => setCartMenuAnchorEl(null);

  // User Menu Handlers (NEW)
  const handleUserMenuOpen = (event) => setUserMenuAnchorEl(event.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchorEl(null);

  // Navigation Handlers
  const handleAdminLogin = () => navigate('/admin-login');
  const handleBookNow = () => navigate('/categories');

  const handleGoToMyBookings = () => {
    handleCartMenuClose();
    handleUserMenuClose();
    navigate('/my-bookings'); 
  };

  // Google Logout
  const handleGoogleLogout = () => {
    handleUserMenuClose();
    googleLogout();
    setUser(null);
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: '#1976d2',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: 0 }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EventIcon sx={{ mr: 2 }} />
            <Typography
              variant="h5"
              component={Link}
              to="/home" // Logo links to /home
              sx={{
                fontWeight: 'bold',
                color: 'white',
                textDecoration: 'none',
                '&:hover': { color: '#e3f2fd' },
              }}
            >
              EventRentals
            </Typography>
          </Box>

          {/* Desktop Links */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 3,
              alignItems: 'center',
            }}
          >
            <Button color="inherit" component={Link} to="/home">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/categories">
              Categories
            </Button>
            <Button color="inherit" component={Link} to="/about">
              About
            </Button>

            <Button
              variant="outlined"
              onClick={handleBookNow}
              sx={{ color: 'white', borderColor: 'white' }}
            >
              Book Now
            </Button>

            <Button
              variant="outlined"
              onClick={handleAdminLogin}
              sx={{ color: 'white', borderColor: 'white' }}
            >
              Admin Login
            </Button>

            {/* User Login / Logout Button */}
            {!user ? (
              <Button
                variant="outlined"
                onClick={() => navigate('/login')}
                sx={{ color: 'white', borderColor: 'white' }}
              >
                User Login
              </Button>
            ) : (
              // ✅ THIS IS THE NEW USER MENU BUTTON
              <Button 
                color="inherit" 
                onClick={handleUserMenuOpen} // <-- Opens user menu
              >
                <Avatar
                  alt={user.name}
                  src={user.picture}
                  sx={{ width: 24, height: 24, mr: 1 }}
                />
                {user.name}
              </Button>
            )}

            {/* "My Bookings" Icon (Only shows if user is logged in) */}
            {user && ( 
              <IconButton color="inherit" onClick={handleCartMenuOpen}>
                <Badge badgeContent={pendingItems} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}

            {/* "My Bookings" Dropdown (from Cart Icon) */}
            <Menu
              anchorEl={cartMenuAnchorEl}
              open={Boolean(cartMenuAnchorEl)}
              onClose={handleCartMenuClose}
            >
              {pendingItems === 0 ? (
                <MenuItem onClick={handleCartMenuClose}>You have no pending bookings</MenuItem>
              ) : (
                <MenuItem onClick={handleCartMenuClose}>
                  You have {pendingItems} booking(s) pending confirmation.
                </MenuItem>
              )}
              <MenuItem>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleGoToMyBookings}
                >
                  View All My Bookings
                </Button>
              </MenuItem>
            </Menu>

            {/* ✅ NEW USER MENU (from Name) */}
            <Menu
              anchorEl={userMenuAnchorEl}
              open={Boolean(userMenuAnchorEl)}
              onClose={handleUserMenuClose}
            >
              <MenuItem onClick={handleGoToMyBookings}> {/* <-- ✅ I FIXED THIS LINE */}
                <ListItemIcon>
                  <BookmarksIcon fontSize="small" />
                </ListItemIcon>
                My Bookings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleGoogleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>

          {/* Mobile Menu Placeholder (Future Use) */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Button color="inherit">Menu</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;