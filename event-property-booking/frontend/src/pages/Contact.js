import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Stack,
  IconButton,
  Paper,
} from '@mui/material';
import {
  Phone,
  WhatsApp,
  Email,
  LocationOn,
  AccessTime,
  Facebook,
  Instagram,
  Send,
} from '@mui/icons-material';

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    eventType: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to a backend
    alert(`Thank you ${formData.name}! We will contact you shortly.`);
  };

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', pb: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
          mb: 6
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Get in touch for bookings and inquiries. We are here to make your event special!
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Contact Information Column */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              {/* Contact Cards */}
              <Card elevation={3} sx={{ borderRadius: 4 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
                    Get in Touch
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={3}>
                    Feel free to contact us via phone or whatsapp 24/7.
                  </Typography>

                  <Stack spacing={3}>
                    {/* Phone */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box sx={{ bgcolor: 'primary.light', p: 1, borderRadius: '50%', color: 'white' }}>
                        <Phone />
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">Phone Number</Typography>
                        <Typography variant="body1">+91 7708268717</Typography>
                        <Typography variant="body1">+91 7708242112</Typography>
                        <Typography variant="body1">+91 9786438585</Typography>
                      </Box>
                    </Box>

                    {/* WhatsApp */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box sx={{ bgcolor: '#25D366', p: 1, borderRadius: '50%', color: 'white' }}>
                        <WhatsApp />
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">WhatsApp</Typography>
                        <Typography variant="body1">+91 7708268717</Typography>
                        <Typography variant="body1">+91 7708242112</Typography>
                        <Button 
                          variant="outlined" 
                          color="success" 
                          size="small" 
                          startIcon={<WhatsApp />}
                          href="https://wa.me/917708242112"
                          target="_blank"
                          sx={{ mt: 1 }}
                        >
                          Chat Now
                        </Button>
                      </Box>
                    </Box>

                    {/* Email */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box sx={{ bgcolor: 'secondary.main', p: 1, borderRadius: '50%', color: 'white' }}>
                        <Email />
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">Email Address</Typography>
                        <Typography variant="body1">akks5402@gmail.com</Typography>
                      </Box>
                    </Box>

                    {/* Address */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box sx={{ bgcolor: 'error.main', p: 1, borderRadius: '50%', color: 'white' }}>
                        <LocationOn />
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">Store Location</Typography>
                        <Typography variant="body1">
                          123,Bommiyamman kovil street,<br />
                          Near Malayappalayam Road,<br />
                          Malayappalayam, Tamil Nadu - 638460
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Paper elevation={0} sx={{ p: 3, bgcolor: 'transparent', border: '1px solid #e0e0e0', borderRadius: 4 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">Follow Us</Typography>
                <Stack direction="row" spacing={2}>
                  <IconButton color="primary" sx={{ bgcolor: 'white' }}><Facebook /></IconButton>
                  <IconButton color="secondary" sx={{ bgcolor: 'white' }}><Instagram /></IconButton>
                </Stack>
              </Paper>
            </Stack>
          </Grid>

          {/* Inquiry Form Column */}
          <Grid item xs={12} md={7}>
            <Card elevation={3} sx={{ borderRadius: 4, height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
                  Send us a Message
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={4}>
                  Fill out the form below and we will get back to you with a quote.
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        variant="outlined"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Mobile Number"
                        name="mobile"
                        variant="outlined"
                        required
                        type="tel"
                        value={formData.mobile}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Event Type (e.g., Wedding)"
                        name="eventType"
                        variant="outlined"
                        value={formData.eventType}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message / Requirements"
                        name="message"
                        multiline
                        rows={4}
                        variant="outlined"
                        required
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        endIcon={<Send />}
                        sx={{
                          py: 1.5,
                          fontSize: '1.1rem',
                          background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                        }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Map Section (Google Maps Embed) */}
        <Box sx={{ mt: 6 }}>
          <Card elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
            <iframe 
              title="Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.255893958398!2d76.9558!3d11.0168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTEuMDE2OCw3Ni45NTU4!5e0!3m2!1sen!2sin!4v1630000000000!5m2!1sen!2sin" 
              width="100%" 
              height="400" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;