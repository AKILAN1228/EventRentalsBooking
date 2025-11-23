import React from 'react';
import { Container, Typography, Box, Grid, Paper, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { allProducts } from '../data/productData'; // Import all products
import ProductCard from '../components/ProductCard'; // Import our new card

// Choose which products to feature by their ID
const featuredProductIds = ['w1', 'p1', 'b2', 'p3', 'c2', 'c4'];

// Get the actual product objects from the allProducts list
const featuredProducts = allProducts.filter(product => 
  featuredProductIds.includes(product.id)
);

const Featured = () => {
  return (
    <Box sx={{ bgcolor: '#f8f9fa', py: 8, minHeight: '90vh' }}>
      <Container maxWidth="lg">
        <Paper 
          elevation={6} 
          sx={{ 
            p: { xs: 3, md: 6 }, 
            borderRadius: 3, 
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.05)'
          }}
        >
          
          <Avatar 
            sx={{ 
              bgcolor: 'secondary.main', 
              width: 80, 
              height: 80, 
              margin: 'auto', 
              mb: 2,
              boxShadow: '0 4px 15px rgba(211, 47, 47, 0.4)'
            }}
          >
            <StarIcon sx={{ fontSize: 50 }} />
          </Avatar>
          
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
            Featured Rentals
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}>
            Our most popular and highly-rated items for your next event.
          </Typography>

          <Box sx={{ my: 4, borderTop: '2px solid #d32f2f', pt: 4 }}>
            <Grid container spacing={4} justifyContent="center">
              {featuredProducts.length > 0 ? (
                featuredProducts.map(product => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))
              ) : (
                <Typography variant="h6" color="text.secondary">
                  No featured products are available at this moment.
                </Typography>
              )}
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Featured;