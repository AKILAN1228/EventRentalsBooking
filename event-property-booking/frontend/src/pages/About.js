import React from 'react';
import { Container, Typography, Box, Paper, Grid, Avatar } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const About = () => {
  return (
    <Box 
      sx={{ 
        // Background-ku oru chinna gradient add panrom
        background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)', 
        py: 8, 
        minHeight: '90vh' 
      }}
    >
      <Container maxWidth="lg">
        <Paper 
          elevation={6} 
          sx={{ 
            p: { xs: 3, md: 6 }, 
            borderRadius: 3, 
            textAlign: 'center',
            // Light shadow for depth
            boxShadow: '0 8px 32px rgba(0,0,0,0.05)'
          }}
        >
          
          <Avatar 
            sx={{ 
              // Icon-ku gradient background
              background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)', 
              width: 80, 
              height: 80, 
              margin: 'auto', 
              mb: 2,
              boxShadow: '0 4px 15px rgba(25, 118, 210, 0.4)'
            }}
          >
            <StorefrontIcon sx={{ fontSize: 50 }} />
          </Avatar>
          
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            About EventRentals
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}>
            Your partner in creating unforgettable events in Erode and beyond.
          </Typography>

          {/* Section 1: Our Mission */}
          <Box sx={{ my: 4, textAlign: 'left', borderTop: '2px solid #1976d2', pt: 4 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                  Our Mission 🎯
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                  Our mission is simple: to provide high-quality, reliable, and affordable event rental equipment to make your special occasions perfect. We believe that every event, big or small, deserves professional-grade equipment and dedicated service.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    // Image-ku hover transition
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                    }
                  }}
                  src="https://res.cloudinary.com/dzavyq7el/image/upload/v1763305833/SivaShakthi_Kalyaan_Store_vsvq3d.jpg"
                  alt="Event Setup"
                />
              </Grid>
            </Grid>
          </Box>

          {/* Section 2: Our Story */}
          <Box sx={{ my: 4, textAlign: 'left', borderTop: '1px solid #ddd', pt: 4 }}>
            <Grid container spacing={4} alignItems="center" direction="row-reverse">
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                  Our Story 📜
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                  Founded in Erode, EventRentals started as a small family-run business with a passion for helping people celebrate. We saw a need for a one-stop-shop for all event needs—from chairs and tables to professional sound and lighting. Over the years, we've grown our inventory and our team, but our commitment to our customers remains the same.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                 <Box
                  component="img"
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    // Image-ku hover transition
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                    }
                  }}
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600"
                  alt="Our Team"
                />
              </Grid>
            </Grid>
          </Box>

          {/* Section 3: Why Choose Us? (WITH TRANSITIONS) */}
          <Box sx={{ my: 4, textAlign: 'center', borderTop: '1px solid #ddd', pt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
              Why Choose Us?
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              
              {/* Card 1: Local Experts */}
              <Grid item xs={12} md={4}>
                <Paper 
                  elevation={4} 
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 2,
                    // Ithu thaan transition
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: 12, // Shadow increase aagum
                    }
                  }}
                >
                  <LocationOnIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Local Experts</Typography>
                  <Typography>We are based in Erode and understand the local culture and event needs perfectly.</Typography>
                </Paper>
              </Grid>
              
              {/* Card 2: Dedicated Team */}
              <Grid item xs={12} md={4}>
                <Paper 
                  elevation={4} 
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 2,
                    // Ithu thaan transition
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: 12,
                    }
                  }}
                >
                  <PeopleIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Dedicated Team</Typography>
                  <Typography>Our professional team ensures on-time delivery, setup, and support throughout your event.</Typography>
                </Paper>
              </Grid>
              
              {/* Card 3: One-Stop Solution */}
              <Grid item xs={12} md={4}>
                <Paper 
                  elevation={4} 
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 2,
                    // Ithu thaan transition
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: 12,
                    }
                  }}
                >
                  <EventIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>One-Stop Solution</Typography>
                  <Typography>From furniture and decor to sound and lighting, we have everything you need under one roof.</Typography>
                </Paper>
              </Grid>

            </Grid>
          </Box>
          
        </Paper>
      </Container>
    </Box>
  );
};

export default About;