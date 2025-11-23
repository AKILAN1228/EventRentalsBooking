// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Container,
//   Typography,
//   Paper,
//   Grid,
//   Card,
//   CardContent,
//   Button,
//   Box,
//   Chip,
//   Divider,
//   AppBar,
//   Toolbar,
//   Alert,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Snackbar,
//   TextField,
//   MenuItem,
// } from '@mui/material';
// import LogoutIcon from '@mui/icons-material/Logout';
// import EventIcon from '@mui/icons-material/Event';
// import DeleteIcon from '@mui/icons-material/Delete';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import SearchIcon from '@mui/icons-material/Search';
// import FilterListIcon from '@mui/icons-material/FilterList';

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [bookings, setBookings] = useState([]);
//   const [adminUser, setAdminUser] = useState('');
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [viewDialogOpen, setViewDialogOpen] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
//   // Search and filter states
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');

//   useEffect(() => {
//     const isAdmin = localStorage.getItem('admin');
//     const adminName = localStorage.getItem('adminUser');
    
//     if (!isAdmin) {
//       navigate('/admin-login');
//       return;
//     }
//     setAdminUser(adminName || 'Admin');
//     loadBookings();
//   }, [navigate]);

//   const loadBookings = () => {
//     const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
//     setBookings(savedBookings);
//     window.dispatchEvent(new Event('storage'));
//   };

//   // Add filtered bookings
//   const filteredBookings = bookings.filter(booking => {
//     const matchesSearch = 
//       booking.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.mobile?.includes(searchTerm) ||
//       booking.eventName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.id?.toString().includes(searchTerm) ||
//       booking.userEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;
    
//     return matchesSearch && matchesStatus;
//   });

//   // SMS Functions
//   const sendSMSViaTextLocal = async (mobile, message) => {
//     console.log(`SMS to ${mobile}: ${message}`);
//     return true; // Demo mode
//   };

//   const handleStatusChange = async (bookingId, newStatus) => {
//     try {
//       const booking = bookings.find(b => b.id === bookingId);
//       if (!booking) return;

//       const updatedBookings = bookings.map(booking =>
//         booking.id === bookingId ? { ...booking, status: newStatus } : booking
//       );
//       setBookings(updatedBookings);
//       localStorage.setItem('bookings', JSON.stringify(updatedBookings));
//       window.dispatchEvent(new Event('storage'));

//       if (newStatus === 'Confirmed') {
//         const message = `Dear ${booking.fullName}, your booking #${bookingId} for ${booking.eventName} has been CONFIRMED. Total: ₹${booking.finalTotal || booking.total}. EventRentals - 7708242112`;
//         const smsSent = await sendSMSViaTextLocal(booking.mobile, message);
        
//         if (smsSent) {
//           setSnackbar({ open: true, message: `Booking confirmed and SMS sent to ${booking.mobile}`, severity: 'success' });
//         } else {
//           setSnackbar({ open: true, message: `Booking confirmed but SMS failed`, severity: 'warning' });
//         }
//       }
//     } catch (error) {
//       console.error('Error updating booking status:', error);
//       setSnackbar({ open: true, message: 'Error updating status', severity: 'error' });
//     }
//   };

//   // Delete booking logic
//   const handleDeleteBooking = (bookingId) => {
//     if (window.confirm('Are you sure you want to PERMANENTLY DELETE this booking? This will remove it from the user\'s "My Bookings" page as well.')) {
      
//       const updatedBookings = bookings.filter(booking =>
//         booking.id !== bookingId
//       );
      
//       setBookings(updatedBookings);
//       localStorage.setItem('bookings', JSON.stringify(updatedBookings));
//       window.dispatchEvent(new Event('storage'));

//       setSnackbar({
//         open: true,
//         message: 'Booking permanently deleted!',
//         severity: 'error'
//       });
//     }
//   };

//   const handleViewDetails = (booking) => {
//     setSelectedBooking(booking);
//     setViewDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setViewDialogOpen(false);
//     setSelectedBooking(null);
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('admin');
//     localStorage.removeItem('adminUser');
//     window.dispatchEvent(new Event('storage'));
//     navigate('/admin-login');
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Confirmed': return 'success';
//       case 'Pending': return 'warning';
//       case 'Cancelled': return 'error';
//       default: return 'default';
//     }
//   };

//   const getTotalRevenue = () => {
//     return bookings
//       .filter(b => b.status === 'Confirmed') 
//       .reduce((total, booking) => total + (booking.finalTotal || booking.total || 0), 0);
//   };

//   const getConfirmedBookings = () => bookings.filter(booking => booking.status === 'Confirmed').length;
//   const getPendingBookings = () => bookings.filter(booking => booking.status === 'Pending').length;

//   // Clear search and filters
//   const handleClearFilters = () => {
//     setSearchTerm('');
//     setStatusFilter('All');
//   };

//   return (
//     <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f8f9fa' }}>
//       <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
//         <Toolbar>
//           <EventIcon sx={{ mr: 2 }} />
//           <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
//             Admin Dashboard - EventRentals
//           </Typography>
//           <Typography variant="body1" sx={{ mr: 2 }}>
//             Welcome, {adminUser}!
//           </Typography>
//           <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
//             Logout
//           </Button>
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         {/* Dashboard Stats */}
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           <Grid item xs={12} sm={6} md={3}>
//             <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#E3F2FD' }}>
//               <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
//                 {bookings.length}
//               </Typography>
//               <Typography variant="h6">Total Bookings</Typography>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#E8F5E8' }}>
//               <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
//                 {getConfirmedBookings()}
//               </Typography>
//               <Typography variant="h6">Confirmed</Typography>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#FFF3E0' }}>
//               <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#EF6C00' }}>
//                 {getPendingBookings()}
//               </Typography>
//               <Typography variant="h6">Pending</Typography>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#FCE4EC' }}>
//               <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#C2185B' }}>
//                 ₹{getTotalRevenue()}
//               </Typography>
//               <Typography variant="h6">Total Revenue</Typography>
//             </Paper>
//           </Grid>
//         </Grid>

//         <Typography 
//           variant="h4" 
//           component="h1" 
//           gutterBottom 
//           sx={{ fontWeight: 'bold', color: '#1976d2', textAlign: 'center', mb: 4 }}
//         >
//           📋 Booking Management
//         </Typography>

//         {/* Search and Filter Section */}
//         <Paper sx={{ p: 3, mb: 3, bgcolor: '#f8f9fa' }}>
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={12} md={5}>
//               <TextField
//                 fullWidth
//                 label="Search bookings..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 variant="outlined"
//                 size="small"
//                 InputProps={{
//                   startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
//                 }}
//                 placeholder="Search by name, mobile, event, booking ID..."
//               />
//             </Grid>
//             <Grid item xs={12} md={5}>
//               <TextField
//                 fullWidth
//                 select
//                 label="Filter by Status"
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 variant="outlined"
//                 size="small"
//                 InputProps={{
//                   startAdornment: <FilterListIcon sx={{ color: 'text.secondary', mr: 1 }} />,
//                 }}
//               >
//                 <MenuItem value="All">All Status</MenuItem>
//                 <MenuItem value="Pending">Pending</MenuItem>
//                 <MenuItem value="Confirmed">Confirmed</MenuItem>
//                 <MenuItem value="Cancelled">Cancelled</MenuItem>
//               </TextField>
//             </Grid>
//             <Grid item xs={12} md={2}>
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 onClick={handleClearFilters}
//                 size="small"
//                 sx={{ height: '40px' }}
//               >
//                 Clear Filters
//               </Button>
//             </Grid>
//           </Grid>
          
//           {/* Results counter */}
//           <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="body2" color="text.secondary">
//               Showing {filteredBookings.length} of {bookings.length} bookings
//             </Typography>
//             {(searchTerm || statusFilter !== 'All') && (
//               <Chip 
//                 label="Filters Active" 
//                 color="primary" 
//                 variant="outlined" 
//                 size="small" 
//               />
//             )}
//           </Box>
//         </Paper>

//         {filteredBookings.length === 0 ? (
//           <Paper sx={{ p: 6, textAlign: 'center' }}>
//             {bookings.length === 0 ? (
//               <>
//                 <Typography variant="h5" color="textSecondary" gutterBottom>
//                   No bookings found
//                 </Typography>
//                 <Typography variant="body1" color="textSecondary">
//                   All bookings will appear here once customers start booking.
//                 </Typography>
//               </>
//             ) : (
//               <>
//                 <Typography variant="h5" color="textSecondary" gutterBottom>
//                   No matching bookings found
//                 </Typography>
//                 <Typography variant="body1" color="textSecondary">
//                   Try adjusting your search terms or filters.
//                 </Typography>
//                 <Button 
//                   variant="contained" 
//                   onClick={handleClearFilters}
//                   sx={{ mt: 2 }}
//                 >
//                   Clear All Filters
//                 </Button>
//               </>
//             )}
//           </Paper>
//         ) : (
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label="bookings table">
//               <TableHead sx={{ bgcolor: '#1976d2' }}>
//                 <TableRow>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Booking ID</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Event</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Customer</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Mobile</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Amount</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredBookings.map((booking) => (
//                   <TableRow 
//                     key={booking.id} 
//                     sx={{ 
//                       '&:last-child td, &:last-child th': { border: 0 },
//                       '&:hover': { bgcolor: '#f5f5f5' }
//                     }}
//                   >
//                     <TableCell>
//                       <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//                         {booking.id}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//                         {booking.eventName}
//                       </Typography>
//                       <Typography variant="body2" color="textSecondary">
//                         {booking.eventTamilName}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//                         {booking.fullName}
//                       </Typography>
//                       <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
//                         {booking.userEmail}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>{booking.mobile}</TableCell>
//                     <TableCell>
//                       {booking.fromDate && booking.toDate ? (
//                         <Box>
//                           <Typography variant="body2">
//                             {booking.fromDate} to {booking.toDate}
//                           </Typography>
//                           <Typography variant="body2" color="textSecondary">
//                             ({booking.totalDays || 1} days)
//                           </Typography>
//                         </Box>
//                       ) : (
//                         `${booking.date} ${booking.day ? `(${booking.day})` : ''}`
//                       )}
//                     </TableCell>
//                     <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>
//                       ₹{booking.finalTotal || booking.total || 0}
//                     </TableCell>
//                     <TableCell>
//                       <Chip 
//                         label={booking.status || 'Pending'} 
//                         color={getStatusColor(booking.status)}
//                         size="small"
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//                         <Button
//                           variant="outlined"
//                           size="small"
//                           startIcon={<VisibilityIcon />}
//                           onClick={() => handleViewDetails(booking)}
//                         >
//                           View
//                         </Button>
//                         {booking.status === 'Pending' && ( 
//                           <Button
//                             variant="contained"
//                             color="success"
//                             size="small"
//                             startIcon={<CheckCircleIcon />}
//                             onClick={() => handleStatusChange(booking.id, 'Confirmed')}
//                           >
//                             Confirm
//                           </Button>
//                         )}
                        
//                         <Button
//                           variant="outlined"
//                           color="error"
//                           size="small"
//                           startIcon={<DeleteIcon />}
//                           onClick={() => handleDeleteBooking(booking.id)}
//                         >
//                           Delete
//                         </Button>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Container>
      
//       {/* View Booking Details Dialog */}
//       <Dialog 
//         open={viewDialogOpen} 
//         onClose={handleCloseDialog}
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogTitle>
//           <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
//             Booking Details - {selectedBooking?.id}
//           </Typography>
//         </DialogTitle>
//         <DialogContent>
//           {selectedBooking && (
//             <Box>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12} sm={6}>
//                   <Typography variant="body2" color="text.secondary">Event:</Typography>
//                   <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
//                     {selectedBooking.eventName} ({selectedBooking.eventTamilName})
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Typography variant="body2" color="text.secondary">Customer:</Typography>
//                   <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
//                     {selectedBooking.fullName}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {selectedBooking.userEmail}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Typography variant="body2" color="text.secondary">Mobile:</Typography>
//                   <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
//                     {selectedBooking.mobile}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Typography variant="body2" color="text.secondary">
//                     {selectedBooking.fromDate ? 'Booking Period:' : 'Date:'}
//                   </Typography>
//                   <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
//                     {selectedBooking.fromDate && selectedBooking.toDate 
//                       ? `${selectedBooking.fromDate} to ${selectedBooking.toDate} (${selectedBooking.totalDays || 1} days)`
//                       : `${selectedBooking.date} ${selectedBooking.day ? `(${selectedBooking.day})` : ''}`
//                     }
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="body2" color="text.secondary">Address:</Typography>
//                   <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
//                     {selectedBooking.address}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="body2" color="text.secondary">Location Link:</Typography>
//                   <Typography variant="body1">
//                     {selectedBooking.locationLink}
//                   </Typography>
//                 </Grid>
//               </Grid>
//               <Divider sx={{ my: 2 }} />
//               <Typography variant="h6" gutterBottom>
//                 Products:
//               </Typography>
//               {selectedBooking.products?.map((product, index) => (
//                 <Box key={index} sx={{ mb: 1 }}>
//                   <Typography variant="body2">
//                     • {product.name} ({product.tamilName}) - 
//                     Qty: {product.quantity} × ₹{product.price} = ₹{product.quantity * parseInt(product.price)}
//                   </Typography>
//                 </Box>
//               ))}
//               <Divider sx={{ my: 2 }} />
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
//                   Total Amount:
//                 </Typography>
//                 <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
//                   ₹{selectedBooking.finalTotal || selectedBooking.total || 0}
//                 </Typography>
//               </Box>
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Close</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert 
//           onClose={handleCloseSnackbar} 
//           severity={snackbar.severity} 
//           sx={{ width: '100%' }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Chip,
  Divider,
  AppBar,
  Toolbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  TextField,
  MenuItem,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import EventIcon from '@mui/icons-material/Event';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [adminUser, setAdminUser] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(true);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const isAdmin = localStorage.getItem('admin');
    const adminName = localStorage.getItem('adminUser');
    
    if (!isAdmin) {
      navigate('/admin-login');
      return;
    }
    setAdminUser(adminName || 'Admin');
    loadBookings();
  }, [navigate]);

  // ✅ UPDATED: Load bookings from MongoDB backend
  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/bookings');
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
        
        // Also sync with localStorage for frontend consistency
        localStorage.setItem('bookings', JSON.stringify(data));
      } else {
        throw new Error('Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
      // Fallback to localStorage if API fails
      const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      setBookings(savedBookings);
      setSnackbar({ 
        open: true, 
        message: 'Using cached data. Could not connect to server.', 
        severity: 'warning' 
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATED: Update booking status in MongoDB
  const updateBookingStatusInDB = async (bookingId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update status');
      }

      const result = await response.json();
      console.log('✅ MongoDB status updated:', result);
      return true;
    } catch (error) {
      console.error('❌ Error updating status in MongoDB:', error);
      return false;
    }
  };

  // ✅ UPDATED: Delete booking from MongoDB
  const deleteBookingFromDB = async (bookingId) => {
    try {
      // Note: You'll need to add a DELETE route in your backend
      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete booking from database');
      }

      console.log('✅ Booking deleted from MongoDB');
      return true;
    } catch (error) {
      console.error('❌ Error deleting booking from MongoDB:', error);
      return false;
    }
  };

  // Add filtered bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.mobile?.includes(searchTerm) ||
      booking.eventName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id?.toString().includes(searchTerm) ||
      booking.userEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // SMS Functions
  const sendSMSViaTextLocal = async (mobile, message) => {
    console.log(`SMS to ${mobile}: ${message}`);
    return true; // Demo mode
  };

  // ✅ UPDATED: Handle status change with MongoDB integration
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking) return;

      // Update in MongoDB first
      const dbSuccess = await updateBookingStatusInDB(bookingId, newStatus);
      
      if (dbSuccess) {
        // Update local state
        const updatedBookings = bookings.map(booking =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        );
        setBookings(updatedBookings);
        
        // Also update localStorage for frontend consistency
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        window.dispatchEvent(new Event('storage'));

        // Send SMS for confirmed bookings
        if (newStatus === 'Confirmed') {
          const message = `Dear ${booking.fullName}, your booking #${bookingId} for ${booking.eventName} has been CONFIRMED. Total: ₹${booking.finalTotal || booking.total}. EventRentals - 7708242112`;
          const smsSent = await sendSMSViaTextLocal(booking.mobile, message);
          
          if (smsSent) {
            setSnackbar({ open: true, message: `Booking confirmed and SMS sent to ${booking.mobile}`, severity: 'success' });
          } else {
            setSnackbar({ open: true, message: `Booking confirmed but SMS failed`, severity: 'warning' });
          }
        } else {
          setSnackbar({ open: true, message: `Booking status updated to ${newStatus}`, severity: 'success' });
        }
      } else {
        setSnackbar({ open: true, message: 'Failed to update status in database', severity: 'error' });
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      setSnackbar({ open: true, message: 'Error updating status', severity: 'error' });
    }
  };

  // ✅ UPDATED: Delete booking with MongoDB integration
  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to PERMANENTLY DELETE this booking? This will remove it from the database and user\'s "My Bookings" page.')) {
      try {
        // Delete from MongoDB first
        const dbSuccess = await deleteBookingFromDB(bookingId);
        
        if (dbSuccess) {
          // Update local state
          const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
          setBookings(updatedBookings);
          
          // Update localStorage
          localStorage.setItem('bookings', JSON.stringify(updatedBookings));
          window.dispatchEvent(new Event('storage'));

          setSnackbar({
            open: true,
            message: 'Booking permanently deleted from database!',
            severity: 'error'
          });
        } else {
          setSnackbar({
            open: true,
            message: 'Failed to delete booking from database',
            severity: 'error'
          });
        }
      } catch (error) {
        console.error('Error deleting booking:', error);
        setSnackbar({
          open: true,
          message: 'Error deleting booking',
          severity: 'error'
        });
      }
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setViewDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setViewDialogOpen(false);
    setSelectedBooking(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('adminUser');
    window.dispatchEvent(new Event('storage'));
    navigate('/admin-login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'success';
      case 'Pending': return 'warning';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  const getTotalRevenue = () => {
    return bookings
      .filter(b => b.status === 'Confirmed') 
      .reduce((total, booking) => total + (booking.finalTotal || booking.total || 0), 0);
  };

  const getConfirmedBookings = () => bookings.filter(booking => booking.status === 'Confirmed').length;
  const getPendingBookings = () => bookings.filter(booking => booking.status === 'Pending').length;

  // Clear search and filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
  };

  if (loading) {
    return (
      <Container>
        <Typography variant="h4" sx={{ mt: 4, textAlign: 'center' }}>
          Loading bookings...
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
        <Toolbar>
          <EventIcon sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Admin Dashboard - EventRentals
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Welcome, {adminUser}!
          </Typography>
          <Button 
            variant="outlined" 
            color="inherit" 
            onClick={handleLogout} 
            startIcon={<LogoutIcon />}
            sx={{ borderColor: 'white', color: 'white' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Dashboard Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#E3F2FD' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                {bookings.length}
              </Typography>
              <Typography variant="h6">Total Bookings</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#E8F5E8' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                {getConfirmedBookings()}
              </Typography>
              <Typography variant="h6">Confirmed</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#FFF3E0' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#EF6C00' }}>
                {getPendingBookings()}
              </Typography>
              <Typography variant="h6">Pending</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#FCE4EC' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#C2185B' }}>
                ₹{getTotalRevenue()}
              </Typography>
              <Typography variant="h6">Total Revenue</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ fontWeight: 'bold', color: '#1976d2', textAlign: 'center', mb: 4 }}
        >
          📋 Booking Management
        </Typography>

        {/* Search and Filter Section */}
        <Paper sx={{ p: 3, mb: 3, bgcolor: '#f8f9fa' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                }}
                placeholder="Search by name, mobile, event, booking ID..."
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                select
                label="Filter by Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: <FilterListIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                }}
              >
                <MenuItem value="All">All Status</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Confirmed">Confirmed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleClearFilters}
                size="small"
                sx={{ height: '40px' }}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
          
          {/* Results counter */}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredBookings.length} of {bookings.length} bookings
            </Typography>
            {(searchTerm || statusFilter !== 'All') && (
              <Chip 
                label="Filters Active" 
                color="primary" 
                variant="outlined" 
                size="small" 
              />
            )}
          </Box>
        </Paper>

        {filteredBookings.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            {bookings.length === 0 ? (
              <>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                  No bookings found
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  All bookings will appear here once customers start booking.
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                  No matching bookings found
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Try adjusting your search terms or filters.
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={handleClearFilters}
                  sx={{ mt: 2 }}
                >
                  Clear All Filters
                </Button>
              </>
            )}
          </Paper>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="bookings table">
              <TableHead sx={{ bgcolor: '#1976d2' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Booking ID</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Event</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Customer</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Mobile</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Amount</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow 
                    key={booking.id} 
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { bgcolor: '#f5f5f5' }
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        #{booking.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {booking.eventName}
                      </Typography>
                      {booking.eventTamilName && (
                        <Typography variant="body2" color="textSecondary">
                          {booking.eventTamilName}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {booking.fullName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                        {booking.userEmail}
                      </Typography>
                    </TableCell>
                    <TableCell>{booking.mobile}</TableCell>
                    <TableCell>
                      {booking.fromDate && booking.toDate ? (
                        <Box>
                          <Typography variant="body2">
                            {booking.fromDate} to {booking.toDate}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            ({booking.totalDays || 1} days)
                          </Typography>
                        </Box>
                      ) : (
                        `${booking.date} ${booking.day ? `(${booking.day})` : ''}`
                      )}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                      ₹{booking.finalTotal || booking.total || 0}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={booking.status || 'Pending'} 
                        color={getStatusColor(booking.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<VisibilityIcon />}
                          onClick={() => handleViewDetails(booking)}
                        >
                          View
                        </Button>
                        {booking.status === 'Pending' && ( 
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            startIcon={<CheckCircleIcon />}
                            onClick={() => handleStatusChange(booking.id, 'Confirmed')}
                          >
                            Confirm
                          </Button>
                        )}
                        
                        {booking.status === 'Confirmed' && (
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => handleStatusChange(booking.id, 'Completed')}
                          >
                            Complete
                          </Button>
                        )}
                        
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDeleteBooking(booking.id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
      
      {/* View Booking Details Dialog */}
      <Dialog 
        open={viewDialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Booking Details - #{selectedBooking?.id}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedBooking && (
            <Box>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Event:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {selectedBooking.eventName} {selectedBooking.eventTamilName && `(${selectedBooking.eventTamilName})`}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Customer:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {selectedBooking.fullName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedBooking.userEmail}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Mobile:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {selectedBooking.mobile}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    {selectedBooking.fromDate ? 'Booking Period:' : 'Date:'}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {selectedBooking.fromDate && selectedBooking.toDate 
                      ? `${selectedBooking.fromDate} to ${selectedBooking.toDate} (${selectedBooking.totalDays || 1} days)`
                      : `${selectedBooking.date} ${selectedBooking.day ? `(${selectedBooking.day})` : ''}`
                    }
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Address:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {selectedBooking.address}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Location Link:</Typography>
                  <Typography variant="body1">
                    {selectedBooking.locationLink}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Products:
              </Typography>
              {selectedBooking.products?.map((product, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    • {product.name} ({product.tamilName}) - 
                    Qty: {product.quantity} × ₹{product.price} = ₹{product.quantity * parseInt(product.price)}
                  </Typography>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Total Amount:
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  ₹{selectedBooking.finalTotal || selectedBooking.total || 0}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminDashboard;