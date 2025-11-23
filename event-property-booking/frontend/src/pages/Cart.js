// src/pages/Cart.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box,
  Paper, Chip, IconButton, Rating, Alert, Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [cartEventType, setCartEventType] = useState(null);

  // Load cart data from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '{}');
    const savedProducts = JSON.parse(localStorage.getItem('allProducts') || '[]');
    const savedEventType = localStorage.getItem('cartEventType');

    setCart(savedCart);
    setAllProducts(savedProducts);
    setCartEventType(savedEventType);
  }, []);

  // Function to update cart in state and localStorage
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    // Update navbar
    window.dispatchEvent(new Event('storage')); 
  };

  const handleQuantityChange = (productId, change) => {
    const newCart = { ...cart };
    const newQuantity = Math.max(0, (newCart[productId] || 0) + change);

    if (newQuantity === 0) {
      delete newCart[productId];
    } else {
      newCart[productId] = newQuantity;
    }
    updateCart(newCart);
  };

  const handleClearCart = () => {
    updateCart({});
    localStorage.removeItem('cartEventType');
    setCartEventType(null);
  };

  const getCartProducts = () => {
    return Object.entries(cart).map(([id, quantity]) => {
      const product = allProducts.find(p => String(p.id) === String(id));
      return product ? { ...product, quantity } : null;
    }).filter(p => p !== null); // Filter out any nulls
  };

  const cartProducts = getCartProducts();

  const getTotalPrice = () => {
    return cartProducts.reduce((total, p) => total + (parseInt(p.price) * p.quantity), 0);
  };

  const handleProceedToBooking = () => {
    if (!cartEventType) {
      alert("Error: Event type not found. Please add an item again.");
      return;
    }

    // Booking page expects products in location.state
    navigate(`/booking/${cartEventType}`, {
      state: {
        selectedProducts: cartProducts,
        eventName: cartEventType, // We can improve this later
        eventTamilName: '', // We can improve this later
        totalAmount: getTotalPrice()
      }
    });
  };

  if (cartProducts.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Your Cart is Empty</Typography>
        <Button variant="contained" onClick={() => navigate('/home')}>
          Start Booking
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Your Cart
      </Typography>
      
      <Grid container spacing={4}>
        {/* Cart Items List */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            {cartProducts.map(product => (
              <Card key={product.id} sx={{ display: 'flex', mb: 2, boxShadow: 'none', borderBottom: '1px solid #eee' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 2 }}
                  image={product.image}
                  alt={product.name}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: 2 }}>
                  <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                    <Typography component="h5" variant="h6" sx={{ fontWeight: 'bold' }}>
                      {product.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                      {product.tamilName}
                    </Typography>
                    <Typography variant="h6" color="primary.main" sx={{ my: 1 }}>
                      ₹{product.price} <span style={{fontSize: '0.9rem', color: '#555'}}>({product.unit})</span>
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton size="small" onClick={() => handleQuantityChange(product.id, -1)}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="h6">{product.quantity}</Typography>
                      <IconButton size="small" onClick={() => handleQuantityChange(product.id, 1)}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Box>
                <Box sx={{ p: 2, textAlign: 'right' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    ₹{parseInt(product.price) * product.quantity}
                  </Typography>
                </Box>
              </Card>
            ))}
            <Button variant="outlined" color="error" onClick={handleClearCart} sx={{ mt: 2 }}>
              Clear Cart
            </Button>
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 100 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Subtotal</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>₹{getTotalPrice()}</Typography>
            </Box>
            <Alert severity="info" sx={{ mb: 2 }}>
              Delivery charge will be calculated on the booking page.
            </Alert>
            <Button 
              variant="contained" 
              size="large" 
              fullWidth
              onClick={handleProceedToBooking}
            >
              Proceed to Booking
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;