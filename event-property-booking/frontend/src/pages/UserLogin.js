
// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link, useLocation } from 'react-router-dom';
// import { Box, TextField, Button, Typography, Paper, Alert, CircularProgress, Divider } from '@mui/material';

// // ✅ Google login-ku intha 2 line-um theva
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import  jwtDecode from 'jwt-decode'; // jwtDecode import pannikonga


// const UserLogin = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
  
//   // Check for success message from registration
//   useEffect(() => {
//     if (location.state?.fromRegister) {
//       setSuccess('Registration successful! Please login with your credentials.');
//     }
//   }, [location]);

//   // ✅ PUTHU HELPER FUNCTION: User login-a save pannum
//   const loginUser = (userData) => {
//     // Unga Booking.js and MyBookings.js intha 'user' key-a thaan theduthu
//     localStorage.setItem('user', JSON.stringify(userData));
    
//     // Navbar-a update panna signal anupurom
//     window.dispatchEvent(new Event('loginSuccess'));
//     window.dispatchEvent(new Event('storage')); // Mela irukura badge-a update panna

//     setLoading(false);
//     setSuccess('Login successful! Redirecting...');
//     setTimeout(() => {
//       navigate('/home'); // Login aana home page-ku po
//     }, 1000);
//   };

//   // Google Login Callback
//   const handleGoogleCallback = (response) => {
//     setLoading(true);
//     try {
//       const userObject = jwtDecode(response.credential);
//       const userData = {
//         name: userObject.name,
//         email: userObject.email,
//         picture: userObject.picture,
//       };
      
//       // Itha "user_db"-layum save pannikalam (optional, but good)
//       const usersDB = JSON.parse(localStorage.getItem('user_db') || '[]');
//       const existingUser = usersDB.find(user => user.email === userData.email);
//       if (!existingUser) {
//         usersDB.push({ ...userData, password: 'google_user' }); // Google user-ku password theva illa
//         localStorage.setItem('user_db', JSON.stringify(usersDB));
//       }
      
//       // User-a login pannu
//       loginUser(userData);

//     } catch (err) {
//       console.error('Google login error:', err);
//       setLoading(false);
//       setError('Google login failed. Please try again.');
//     }
//   };


//   // ✅ PUTHU EMAIL LOGIN LOGIC
//   const handleEmailLogin = (e) => {
//     if (e) e.preventDefault();
    
//     if (!email || !password) {
//       setError('Please enter both email and password');
//       return;
//     }
    
//     setError('');
//     setSuccess('');
//     setLoading(true);

//     try {
//       // 1. Load users database
//       const usersDB = JSON.parse(localStorage.getItem('user_db') || '[]');

//       // 2. Find user
//       const user = usersDB.find(
//         u => u.email === email.toLowerCase() && u.password === password
//       );

//       // 3. Check login
//       if (user) {
//         // Login success!
//         const userData = {
//           name: user.name,
//           email: user.email,
//           picture: '', // Email login-ku picture illa
//         };
//         loginUser(userData);
//       } else {
//         // Login failed
//         throw new Error('Invalid email or password.');
//       }

//     } catch (err) {
//       setLoading(false);
//       setError(err.message || 'Login failed. Please check your credentials.');
//     }
//   };

//   // Google Client ID (Unga ID correct-a iruntha, itha use pannunga)
//   const googleClientId = "755796465483-0ros247sd7rsetmbofgk5ftua9cdi8sj.apps.googleusercontent.com";

//   return (
//     // ✅ GoogleOAuthProvider-a app-a suthi podanum
//     <GoogleOAuthProvider clientId={googleClientId}>
//       <Box sx={{ 
//         minHeight: '80vh', 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         bgcolor: '#f5f5f5', 
//         py: 5 
//       }}>
//         <Paper sx={{ 
//           p: 5, 
//           width: '400px', 
//           textAlign: 'center',
//           borderRadius: 2,
//           boxShadow: 3
//         }} 
//         elevation={6}>
          
//           <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
//             User Login
//           </Typography>

//           {error && (
//             <Alert severity="error" sx={{ mb: 2, textAlign: 'left' }}>
//               {error}
//             </Alert>
//           )}

//           {success && (
//             <Alert severity="success" sx={{ mb: 2, textAlign: 'left' }}>
//               {success}
//             </Alert>
//           )}

//           <Box component="form" onSubmit={handleEmailLogin}>
//             <TextField 
//               fullWidth 
//               label="Email" 
//               type="email" 
//               value={email} 
//               onChange={(e) => setEmail(e.target.value)} 
//               sx={{ mb: 2 }} 
//               required 
//               disabled={loading}
//             />
//             <TextField 
//               fullWidth 
//               label="Password" 
//               type="password" 
//               value={password} 
//               onChange={(e) => setPassword(e.target.value)} 
//               sx={{ mb: 3 }} 
//               required 
//               disabled={loading}
//             />
//             <Button 
//               fullWidth 
//               variant="contained" 
//               color="primary" 
//               type="submit" 
//               disabled={loading}
//               sx={{ mb: 3, py: 1.5 }}
//             >
//               {loading ? <CircularProgress size={24} /> : 'Login with Email'}
//             </Button>
//           </Box>

//           <Divider sx={{ mb: 3 }}>
//             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//               OR
//             </Typography>
//           </Divider>

//           <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
//             <GoogleLogin
//               onSuccess={handleGoogleCallback}
//               onError={() => {
//                 console.error('Google Login Failed');
//                 setError('Google login failed. Please try again.');
//               }}
//               width="308px"
//               text="continue_with"
//               shape="rectangular"
//               theme="outline"
//               size="large"
//             />
//           </Box>

//           <Typography variant="body1" sx={{ mt: 3, color: 'text.secondary' }}>
//             Don't have an account?{' '}
//             <Link 
//               to="/register" 
//               style={{ 
//                 textDecoration: 'none', 
//                 fontWeight: 'bold',
//                 color: '#1976d2'
//               }}
//             >
//               Register now
//             </Link>
//           </Typography>
//         </Paper>
//       </Box>
//     </GoogleOAuthProvider>
//   );
// };

// export default UserLogin;
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Alert, CircularProgress, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

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

  // Helper function: User login save
  const loginUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    window.dispatchEvent(new Event('loginSuccess'));
    window.dispatchEvent(new Event('storage'));

    setLoading(false);
    setSuccess('Login successful! Redirecting...');
    setTimeout(() => {
      navigate('/home');
    }, 1000);
  };

  // Google Login Callback
  const handleGoogleCallback = (response) => {
    setLoading(true);
    try {
      const userObject = jwtDecode(response.credential);
      const userData = {
        name: userObject.name,
        email: userObject.email,
        picture: userObject.picture,
      };
      
      const usersDB = JSON.parse(localStorage.getItem('user_db') || '[]');
      const existingUser = usersDB.find(user => user.email === userData.email);
      if (!existingUser) {
        usersDB.push({ ...userData, password: 'google_user' });
        localStorage.setItem('user_db', JSON.stringify(usersDB));
      }
      
      loginUser(userData);

    } catch (err) {
      console.error('Google login error:', err);
      setLoading(false);
      setError('Google login failed. Please try again.');
    }
  };

  // Email Login Logic
  const handleEmailLogin = (e) => {
    if (e) e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const usersDB = JSON.parse(localStorage.getItem('user_db') || '[]');
      const user = usersDB.find(
        u => u.email === email.toLowerCase() && u.password === password
      );

      if (user) {
        const userData = {
          name: user.name,
          email: user.email,
          picture: '',
        };
        loginUser(userData);
      } else {
        throw new Error('Invalid email or password.');
      }

    } catch (err) {
      setLoading(false);
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  // Forgot Password Functionality
  const handleForgotPassword = () => {
    if (!resetEmail) {
      setError('Please enter your email address to reset password');
      return;
    }
    
    // Simple password reset simulation
    const usersDB = JSON.parse(localStorage.getItem('user_db') || '[]');
    const user = usersDB.find(u => u.email === resetEmail.toLowerCase());
    
    if (user) {
      setSuccess(`Password reset instructions sent to ${resetEmail}`);
      setForgotPasswordOpen(false);
      setResetEmail('');
      
      // In a real app, you would send an email here
      console.log(`Password reset requested for: ${resetEmail}`);
      
      // Simulate sending reset instructions
      setTimeout(() => {
        setSuccess('If an account exists with this email, reset instructions have been sent.');
      }, 2000);
    } else {
      setError('No account found with this email address');
    }
  };

  // Simple password reset (for demo purposes)
  const handleSimpleReset = () => {
    if (!resetEmail) {
      setError('Please enter your email address');
      return;
    }

    const usersDB = JSON.parse(localStorage.getItem('user_db') || '[]');
    const userIndex = usersDB.findIndex(u => u.email === resetEmail.toLowerCase());
    
    if (userIndex !== -1) {
      // Set a simple default password
      usersDB[userIndex].password = '123456';
      localStorage.setItem('user_db', JSON.stringify(usersDB));
      
      setSuccess(`Password reset to '123456' for ${resetEmail}. Please login and change your password.`);
      setForgotPasswordOpen(false);
      setResetEmail('');
    } else {
      setError('No account found with this email address');
    }
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
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline'
                }
              }}
            >
              Forgot Password?
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <GoogleLogin
              onSuccess={handleGoogleCallback}
              onError={() => {
                console.error('Google Login Failed');
                setError('Google login failed. Please try again.');
              }}
              width="308px"
              text="continue_with"
              shape="rectangular"
              theme="outline"
              size="large"
            />
          </Box>

          <Typography variant="body1" sx={{ mt: 3, color: 'text.secondary' }}>
            Don't have an account?{' '}
            <Link 
              to="/register" 
              style={{ 
                textDecoration: 'none', 
                fontWeight: 'bold',
                color: '#1976d2'
              }}
            >
              Register now
            </Link>
          </Typography>
        </Paper>

        {/* Forgot Password Dialog */}
        <Dialog 
          open={forgotPasswordOpen} 
          onClose={handleCloseForgotPassword}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              Reset Your Password
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              Enter your email address and we'll send you instructions to reset your password.
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
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                For demo purposes: This will reset your password to '123456'
              </Typography>
            </Alert>
          </DialogContent>
          <DialogActions sx={{ p: 3, gap: 1 }}>
            <Button 
              onClick={handleCloseForgotPassword}
              variant="outlined"
              sx={{ minWidth: '100px' }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSimpleReset}
              variant="contained"
              disabled={!resetEmail}
              sx={{ minWidth: '100px' }}
            >
              Reset Password
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </GoogleOAuthProvider>
  );
};

export default UserLogin;