// src/pages/LandingPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EventIcon from '@mui/icons-material/Event';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', bgcolor: '#f8f9fa', py: 8 }}>
      <Container maxWidth="md">
        <Paper elevation={8} sx={{ p: { xs: 3, md: 6 }, textAlign: 'center', borderRadius: 4, border: '3px solid #1976d2' }}>
          
          <EventIcon sx={{ fontSize: 70, color: '#1976d2', mb: 2 }} />
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}
          >
            Welcome to EventRentals
          </Typography>
          
          <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
            Select your access level to proceed:
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            
            {/* User Access Option */}
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={() => navigate('/login')}
                startIcon={<PersonIcon />}
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  py: 3, 
                  fontSize: '1.2rem', 
                  borderRadius: 3,
                  bgcolor: '#2196f3',
                  '&:hover': { bgcolor: '#1565c0', transform: 'translateY(-2px)' }
                }}
              >
                User Login / Sign Up
              </Button>
            </Grid>
            
            {/* Admin Access Option */}
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={() => navigate('/admin-login')}
                startIcon={<SecurityIcon />}
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  py: 3, 
                  fontSize: '1.2rem', 
                  borderRadius: 3,
                  color: '#1976d2',
                  borderColor: '#1976d2',
                  '&:hover': { bgcolor: '#e3f2fd', transform: 'translateY(-2px)', borderColor: '#1565c0' }
                }}
              >
                Admin Login
              </Button>
            </Grid>

            {/* Temporary link to the main site content */}
            <Grid item xs={12}>
               <Button
                variant="text"
                onClick={() => navigate('/home')}
                sx={{ mt: 3, color: 'text.secondary', fontWeight: 'bold' }}
              >
                Browse Site (Continue without Login)
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default LandingPage;