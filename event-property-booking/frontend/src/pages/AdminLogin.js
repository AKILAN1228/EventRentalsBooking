import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    // Simple admin authentication
    if (formData.username === 'admin' && formData.password === 'admin123') {
      localStorage.setItem('admin', 'true');
      localStorage.setItem('adminUser', formData.username);
      window.dispatchEvent(new Event('storage')); // ✅ Navbar update panna
      navigate('/admin-dashboard');
    } else {
      setError('Invalid admin credentials. Use: admin / admin123');
    }
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Container maxWidth="sm" sx={{ py: 12 }}>
        <Paper 
          elevation={6} 
          sx={{ 
            p: 6, 
            textAlign: 'center',
            border: '2px solid #1976d2',
            borderRadius: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
          }}
        >
          <EventIcon sx={{ fontSize: 60, color: '#1976d2', mb: 3 }} />
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              color: '#1976d2',
              mb: 2
            }}
          >
            Admin Login
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#666',
              mb: 4
            }}
          >
            Access the admin dashboard to manage bookings
          </Typography>
          
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                textAlign: 'left'
              }}
            >
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <TextField
              fullWidth
              label="Admin Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
              sx={{ mb: 3 }}
              placeholder="Enter admin username"
            />
            <TextField
              fullWidth
              label="Admin Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
              sx={{ mb: 4 }}
              placeholder="Enter admin password"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ 
                py: 1.5,
                borderRadius: 2,
                fontWeight: 'bold',
                fontSize: '1.1rem',
                bgcolor: '#1976d2',
                '&:hover': {
                  bgcolor: '#1565c0',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              🔐 Login to Admin Panel
            </Button>
          </Box>

          {/* Demo Credentials */}
          <Box 
            sx={{ 
              mt: 4, 
              p: 3, 
              bgcolor: '#E3F2FD', 
              borderRadius: 2,
              border: '1px solid #90CAF9'
            }}
          >
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1 }}>
              Demo Admin Credentials:
            </Typography>
            <Typography variant="body1" sx={{ color: '#1565c0' }}>
              <strong>Username:</strong> admin<br />
              <strong>Password:</strong> admin123
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mt: 1, fontStyle: 'italic' }}>
              Use these credentials to test the admin panel
            </Typography>
          </Box>

          {/* Back to Home Link */}
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Link 
              to="/" 
              style={{ 
                textDecoration: 'none',
                color: '#1976d2',
                fontWeight: 'bold'
              }}
            >
              ← Back to Home
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLogin;