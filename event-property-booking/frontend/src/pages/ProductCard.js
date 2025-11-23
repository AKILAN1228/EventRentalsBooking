import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Rating, Chip, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { tamilNaduEvents, getProductsByEventType } from '../data/productData';

// This helper function finds the event page a product belongs to
const getEventTypeForProduct = (productId) => {
  for (const event of tamilNaduEvents) {
    const products = getProductsByEventType(event.type);
    if (products.some(p => p.id === productId)) {
      return event.type;
    }
  }
  return null; // Fallback
};

const ProductCard = ({ product }) => {
  // Find the event type this product is part of to build the correct link
  const eventType = getEventTypeForProduct(product.id);

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 } }}>
      <CardMedia component="img" height="200" image={product.image} alt={product.name} sx={{ objectFit: 'cover' }} />
      <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
        <Box>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{product.name}</Typography>
          <Typography variant="body2" sx={{ color: 'secondary.main', fontWeight: '500' }}>{product.tamilName}</Typography>
        </Box>
        <Rating value={product.rating} readOnly size="small" sx={{ my: 1 }} />
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>{product.description}</Typography>
        <Box sx={{ mb: 2 }}>
          {product.features && product.features.map((feature) => (
            <Chip key={feature} label={feature} size="small" variant="outlined" sx={{ mr: 1, mb: 1 }} />
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>₹{product.price}</Typography>
            <Typography variant="body2" color="text.secondary">{product.unit}</Typography>
          </Box>
          {eventType && (
            <Button 
              component={Link} 
              to={`/products/${eventType}`} 
              variant="contained" 
              size="small"
            >
              View Event
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;