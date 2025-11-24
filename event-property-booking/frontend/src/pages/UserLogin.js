import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Alert, CircularProgress, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

// ✅ LIVE BACKEND URL
const API_BASE = 'https://eventrentalsbooking.onrender.com/api';

const UserLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  // Check for success message from registration
  useEffect(() => {
    if (location.state?.fromRegister) {
      setSuccess('Registration successful! Please login with your credentials.');
    }
  }, [location]);

  // Helper function: Save Login Data
  const saveLoginData = (data) => {
    localStorage.setItem('userToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    // Dispatch login event for Navbar update
    window.dispatchEvent(new Event('loginSuccess'));
    window.dispatchEvent(new Event('storage'));

    setLoading(false);
    setSuccess('Login successful! Redirecting...');
    
    setTimeout(() => {
      if (data.user.isAdmin) {
        navigate('/admin-dashboard');
      } else {
        navigate('/home');
      }
    }, 1000);
  };

  // Google Login Callback (Optional: Implement backend logic later)
  const handleGoogleCallback = (response) => {
    setLoading(true);
    try {
      const userObject = jwtDecode(response.credential);
      // Note: For full security, send this token to backend to verify and create user
      console.log("Google User:", userObject);
      
      // Temporary Frontend Logic for Google (Ideally should be backend)
      const userData = {
        user: {
          name: userObject.name,
          email: userObject.email,
          isAdmin: false
        },
        token: response.credential
      };
      saveLoginData(userData);

    } catch (err) {
      console.error('Google login error:', err);
      setLoading(false);
      setError('Google login failed. Please try again.');
    }
  };

  // ✅ Updated Email Login Logic (Connecting to Backend)
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        saveLoginData(data);
      } else {
        throw new Error(data.message || 'Invalid email or password');
      }

    } catch (err) {
      setLoading(false);
      console.error("Login Error:", err);
      setError(err.message || 'Login failed. Please check your connection.');
    }
  };

  // Forgot Password Functionality
  const handleForgotPassword = () => {
    // This is just a UI simulation for now
    if (!resetEmail) {
      setError('Please enter your email address to reset password');
      return;
    }
    setSuccess(`Password reset instructions sent to ${resetEmail}`);
    setForgotPasswordOpen(false);
    setResetEmail('');
  };

  const handleOpenForgotPassword = () => {
    setForgotPasswordOpen(true);
    setResetEmail('');
    setError('');
    setSuccess('');
  };

  const handleCloseForgotPassword = () => {
    setForgotPasswordOpen(false);
    setResetEmail('');
    setError('');
    setSuccess('');
  };

  const googleClientId = "755796465483-0ros247sd7rsetmbofgk5ftua9cdi8sj.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Box sx={{ 
        minHeight: '80vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        bgcolor: '#f5f5f5', 
        py: 5 
      }}>
        <Paper sx={{ 
          p: 5, 
          width: '400px', 
          textAlign: 'center', 
          borderRadius: 2, 
          boxShadow: 3
        }} 
        elevation={6}>
          
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
            User Login
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

          <Box component="form" onSubmit={handleEmailLogin}>
            <TextField 
              fullWidth 
              label="Email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              sx={{ mb: 2 }} 
              required 
              disabled={loading}
            />
            <TextField 
              fullWidth 
              label="Password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              sx={{ mb: 3 }} 
              required 
              disabled={loading}
            />
            <Button 
              fullWidth 
              variant="contained" 
              color="primary" 
              type="submit" 
              disabled={loading}
              sx={{ mb: 3, py: 1.5 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Login with Email'}
            </Button>
          </Box>

          {/* Forgot Password Link */}
          <Box sx={{ textAlign: 'center', mt: 1, mb: 2 }}>
            <Button 
              onClick={handleOpenForgotPassword}
              sx={{ 
                textTransform: 'none', 
                color: '#1976d2', 
                fontSize: '0.9rem',
                '&:hover': { textDecoration: 'underline', bgcolor: 'transparent' }
              }}
            >
              Forgot Password?
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>OR</Typography>
          </Divider>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <GoogleLogin
              onSuccess={handleGoogleCallback}
              onError={() => setError('Google login failed.')}
              width="308px"
              text="continue_with"
              shape="rectangular"
              theme="outline"
              size="large"
            />
          </Box>

          <Typography variant="body1" sx={{ mt: 3, color: 'text.secondary' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#1976d2' }}>
              Register now
            </Link>
          </Typography>
        </Paper>

        {/* Forgot Password Dialog */}
        <Dialog open={forgotPasswordOpen} onClose={handleCloseForgotPassword} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>Reset Your Password</Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              Enter your email address and we'll send you instructions.
            </Typography>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
          </DialogContent>
          <DialogActions sx={{ p: 3, gap: 1 }}>
            <Button onClick={handleCloseForgotPassword} variant="outlined">Cancel</Button>
            <Button onClick={handleForgotPassword} variant="contained" disabled={!resetEmail}>Reset Password</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </GoogleOAuthProvider>
  );
};

export default UserLogin;