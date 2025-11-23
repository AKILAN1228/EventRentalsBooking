import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container, Paper, TextField, Button, Typography, Box, Alert,
  LinearProgress, InputAdornment, IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, CheckCircle, Cancel } from '@mui/icons-material';
import EventIcon from '@mui/icons-material/Event';

// API Service
const API_BASE = 'https://eventrentalsbooking.onrender.com/api';

const apiService = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return await response.json();
  }
};

const saveUserData = (userData) => {
  if (userData.token) {
    localStorage.setItem('userToken', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));
  }
};

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Check password strength in real-time
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  // Password strength validation
  const checkPasswordStrength = (password) => {
    if (password.length === 0) return '';
    
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const basicRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    
    if (strongRegex.test(password)) return 'strong';
    if (mediumRegex.test(password)) return 'medium';
    if (basicRegex.test(password)) return 'basic';
    return 'weak';
  };

  const getPasswordStrengthColor = (strength) => {
    switch (strength) {
      case 'strong': return 'success';
      case 'medium': return 'warning';
      case 'basic': return 'info';
      case 'weak': return 'error';
      default: return 'inherit';
    }
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 'strong': return 'Strong Password ✓';
      case 'medium': return 'Medium Password';
      case 'basic': return 'Basic Password';
      case 'weak': return 'Weak Password';
      default: return '';
    }
  };

  const getPasswordStrengthValue = (strength) => {
    switch (strength) {
      case 'strong': return 100;
      case 'medium': return 75;
      case 'basic': return 50;
      case 'weak': return 25;
      default: return 0;
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Updated handleSubmit with MongoDB API
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const { fullName, email, phone, password, confirmPassword } = formData;

    // Enhanced validation
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    
    if (phone.length !== 10 || !/^[6-9]\d{9}$/.test(phone)) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      setLoading(false);
      return;
    }

    const currentPasswordStrength = checkPasswordStrength(password);
    if (currentPasswordStrength === 'weak') {
      setError('Password should be at least 6 characters with both letters and numbers.');
      setLoading(false);
      return;
    }

    try {
      // ✅ MONGODB API CALL - Replace localStorage
      const result = await apiService.register({
        name: fullName,
        email: email.toLowerCase(),
        password: password,
        phone: phone
      });

      if (result.success) {
        // Save user data to localStorage
        saveUserData(result);
        
        setSuccess('Registration successful! Redirecting to login...');
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate('/login', { state: { fromRegister: true } });
        }, 2000);
      } else {
        setError(result.message || 'Registration failed. Please try again.');
      }

    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const PasswordRequirements = () => (
    <Box sx={{ mt: 1, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
        Password Requirements:
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {formData.password.length >= 6 ? 
            <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} /> : 
            <Cancel sx={{ fontSize: 16, color: 'error.main' }} />
          }
          <Typography variant="body2">At least 6 characters</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/(?=.*[a-zA-Z])/.test(formData.password) ? 
            <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} /> : 
            <Cancel sx={{ fontSize: 16, color: 'error.main' }} />
          }
          <Typography variant="body2">Contains letters</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/(?=.*\d)/.test(formData.password) ? 
            <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} /> : 
            <Cancel sx={{ fontSize: 16, color: 'error.main' }} />
          }
          <Typography variant="body2">Contains numbers</Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, minHeight: '90vh', bgcolor: '#f8f9fa', py: 5 }}>
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, md: 5 },
            textAlign: 'center',
            borderRadius: 3,
          }}
        >
          <EventIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            Create Account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, textAlign: 'left' }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2, textAlign: 'left' }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Full Name *"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Email *"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              error={formData.email && !validateEmail(formData.email)}
              helperText={formData.email && !validateEmail(formData.email) ? "Please enter a valid email address" : ""}
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Phone Number (10-digit) *"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
              inputProps={{ maxLength: 10 }}
              required
              error={formData.phone && !/^[6-9]\d{9}$/.test(formData.phone)}
              helperText={formData.phone && !/^[6-9]\d{9}$/.test(formData.phone) ? "Please enter a valid 10-digit Indian mobile number" : ""}
              disabled={loading}
            />
            
            {/* Password Field with Strength Meter */}
            <TextField
              fullWidth
              label="Password *"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      disabled={loading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <Box sx={{ mt: 1, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Password Strength:
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: `${getPasswordStrengthColor(passwordStrength)}.main`
                    }}
                  >
                    {getPasswordStrengthText(passwordStrength)}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={getPasswordStrengthValue(passwordStrength)}
                  color={getPasswordStrengthColor(passwordStrength)}
                  sx={{ height: 6, borderRadius: 3 }}
                />
              </Box>
            )}

            <TextField
              fullWidth
              label="Confirm Password *"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
              error={formData.confirmPassword && formData.password !== formData.confirmPassword}
              helperText={formData.confirmPassword && formData.password !== formData.confirmPassword ? "Passwords do not match" : ""}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                      disabled={loading}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Password Requirements */}
            <PasswordRequirements />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={loading}
              sx={{ 
                py: 1.5, 
                mt: 3, 
                mb: 2, 
                fontSize: '1.1rem',
                '&:disabled': {
                  backgroundColor: 'grey.300'
                }
              }}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </Box>

          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Already have an account?{' '}
            <Link
              to="/login"
              style={{
                textDecoration: 'none',
                fontWeight: 'bold',
                color: '#1976d2'
              }}
            >
              Login here
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;