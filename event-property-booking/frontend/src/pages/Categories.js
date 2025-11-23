import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Select Event Type Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 8,
            p: 5,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 3,
            border: '3px dashed #ffffff',
            animation: 'blink 3s ease-in-out infinite',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              color: 'white',
              textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
              fontSize: { xs: '2rem', md: '3rem' },
              letterSpacing: '0.5px'
            }}
          >
            Select Event Type
          </Typography>
        </Box>

        {/* Categories Grid - 4 Cards */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card   
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  border: 'none',
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(25, 118, 210, 0.15)',
                  }
                }}
                component={Link}
                to={`/products/${category.type}`}
                style={{ textDecoration: 'none' }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Category Icon */}
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)'
                    }}
                  >
                    <Typography variant="h4" sx={{ color: 'white', fontSize: '2rem' }}>
                      {category.emoji}
                    </Typography>
                  </Box>
                  
                  {/* Category Title */}
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 'bold',
                      color: '#1976d2',
                      mb: 2,
                      fontSize: '1.4rem'
                    }}
                  >
                    {category.name}
                  </Typography>
                  
                  {/* Category Description */}
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#666',
                      mb: 3,
                      lineHeight: 1.6,
                      flexGrow: 1,
                      fontSize: '0.95rem'
                    }}
                  >
                    {category.description}
                  </Typography>
                  
                  {/* Items Count */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 'auto'
                  }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: '#1976d2',
                        background: 'rgba(25, 118, 210, 0.1)',
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        fontSize: '0.9rem'
                      }}
                    >
                      {category.items}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Featured Equipment Section */}
        <Box sx={{ textAlign: 'center', background: 'white', p: 6, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <Typography 
            variant="h2" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              color: '#1976d2',
              mb: 3,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Featured Equipment
          </Typography>
          
          <Typography 
            variant="h5" 
            component="p" 
            sx={{ 
              color: '#666',
              mb: 6,
              fontSize: '1.2rem'
            }}
          >
            Popular items for your next event
          </Typography>
          
          <Grid container spacing={4}>
            {featuredProducts.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    borderRadius: 3,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)'
                      }}
                    >
                      <Typography variant="h3" sx={{ color: 'white', fontSize: '2.5rem' }}>
                        {product.emoji}
                      </Typography>
                    </Box>
                    
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 'bold',
                        color: '#1976d2',
                        mb: 2
                      }}
                    >
                      {product.name}
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#666',
                        mb: 3,
                        lineHeight: 1.5
                      }}
                    >
                      {product.description}
                    </Typography>
                    
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: '#1976d2',
                        background: 'rgba(25, 118, 210, 0.1)',
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        display: 'inline-block'
                      }}
                    >
                      {product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

// Categories data
const categories = [
  {
    type: 'furniture',
    name: 'Furniture',
    description: 'Chairs, tables, and seating arrangements',
    items: '10+ items',
    emoji: '🪑'
  },
  {
    type: 'audio-visual',
    name: 'Audio & Visual',
    description: 'Professional sound systems and lighting equipment',
    items: '10+ items',
    emoji: '🎵'
  },
  {
    type: 'decorations',
    name: 'Decorations',
    description: 'Beautiful centerpieces, linens, and floral arrangements',
    items: '25+ items',
    emoji: '🎀'
  },
  {
    type: 'lighting',
    name: 'Lighting',
    description: 'Ambient lighting and decorative illumination',
    items: '15+ items',
    emoji: '💡'
  }
];

// Featured products data
const featuredProducts = [
  {
    name: 'Banquet Chairs',
    description: 'Comfortable seating for all types of events',
    price: '₹150/item',
    emoji: '💺'
  },
  {
    name: 'Sound System',
    description: 'Professional audio equipment with clear sound',
    price: '₹2000/day',
    emoji: '🔊'
  },
  {
    name: 'Stage Lighting',
    description: 'Complete lighting setup for stages',
    price: '₹900/day',
    emoji: '🌟'
  }
];

export default Categories;
