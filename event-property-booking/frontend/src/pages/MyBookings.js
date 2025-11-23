import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Paper, Button, Grid, Chip, Alert, Divider, List, ListItem, ListItemText
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';

const MyBookings = () => {
  const navigate = useNavigate();
  const [myBookings, setMyBookings] = useState([]);
  const [user, setUser] = useState(null);

  const loadUserAndBookings = () => {
    // 1. Current user-a load pannunga
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (!currentUser) {
      // Login pannalana, login page-ku anuppidunga
      navigate('/login');
      return;
    }
    setUser(currentUser);

    // 2. Ella bookings-ayum load pannunga
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    
    // 3. Intha user-oda bookings-a mattum filter pannunga
    const userBookings = allBookings.filter(
      (booking) => booking.userEmail === currentUser.email
    );
    
    // Bookings-a puthusa irukurathu mela vara maari sort pannunga
    setMyBookings(userBookings.sort((a, b) => b.id - a.id));
  };

  useEffect(() => {
    loadUserAndBookings();
  }, [navigate]);

  const getStatusChip = (status) => {
    if (status === 'Confirmed') {
      return <Chip icon={<CheckCircleIcon />} label="Confirmed" color="success" />;
    }
    if (status === 'Cancelled') {
      return <Chip icon={<CancelIcon />} label="Cancelled" color="error" />;
    }
    // Default-a "Pending" nu kaatum
    return <Chip icon={<PendingIcon />} label="Pending" color="warning" />;
  };

  // ✅ PUTHU FUNCTION: User order-a cancel panna
  const handleUserCancel = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      
      // Status-a 'Cancelled' nu maathurom
      const updatedBookings = allBookings.map(b => 
        b.id === bookingId ? { ...b, status: 'Cancelled' } : b
      );

      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
      
      // Page-a refresh panna, puthu data-va kaatum
      loadUserAndBookings(); 
      // Navbar-layum badge count-a update pannurom
      window.dispatchEvent(new Event('storage'));
    }
  };

  if (!user) {
    return null; // Login page-ku redirect aagum
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        My Bookings
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Hi {user.name}, here is your booking history and status.
      </Typography>

      {myBookings.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            You have no bookings yet.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/home')}>
            Make a Booking
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {myBookings.map((booking) => (
            <Grid item xs={12} key={booking.id}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      {booking.eventName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Booking ID: #{booking.id}
                    </Typography>
                  </Box>
                  {getStatusChip(booking.status)}
                </Box>
                
                {booking.status === 'Confirmed' && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Admin confirmed your rental successfully!
                  </Alert>
                )}
                 {booking.status === 'Pending' && (
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    Your booking is waiting for admin confirmation.
                  </Alert>
                )}
                 {booking.status === 'Cancelled' && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    This order has been cancelled.
                  </Alert>
                )}


                <Divider sx={{ my: 2 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body2" color="text.secondary">Total Amount</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      ₹{booking.finalTotal}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="body2" color="text.secondary">Booking Period</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {booking.totalDays} Days
                    </Typography>
                  </Grid>
                   <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="text.secondary">Dates</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {booking.fromDate} to {booking.toDate}
                    </Typography>
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Booked Items:</Typography>
                  <List dense>
                    {booking.products.map(p => (
                      <ListItem key={p.id} sx={{ p: 0 }}>
                        <ListItemText 
                          primary={`${p.name} (x${p.quantity})`}
                          secondary={`₹${p.price} per day`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
                
                {/* ✅ PUTHU CANCEL BUTTON */}
                {booking.status === 'Pending' && (
                  <Box sx={{ mt: 2, textAlign: 'right' }}>
                    <Button 
                      variant="outlined" 
                      color="error"
                      size="small"
                      startIcon={<CancelIcon />}
                      onClick={() => handleUserCancel(booking.id)}
                    >
                      Cancel Booking
                    </Button>
                  </Box>
                )}

              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
export default MyBookings;