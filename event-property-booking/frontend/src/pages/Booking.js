import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  Chip,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import jsPDF from 'jspdf';

const Booking = () => {
  const { eventType } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    fullName: '',
    address: '',
    locationLink: '',
    mobile: '',
    fromDate: '',
    toDate: '',
    eventName: '',
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventTamilName, setEventTamilName] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [totalDays, setTotalDays] = useState(0);

  const steps = ['Review Order', 'Customer Details', 'Confirmation'];

  useEffect(() => {
    if (location.state?.selectedProducts) {
      setSelectedProducts(location.state.selectedProducts);
      setEventName(location.state.eventName);
      setEventTamilName(location.state.eventTamilName);
      setBookingData(prev => ({
        ...prev,
        eventName: location.state.eventName
      }));
    } else {
      navigate('/categories');
    }
  }, [location, navigate]);

  // Calculate total days when fromDate or toDate changes
  useEffect(() => {
    if (bookingData.fromDate && bookingData.toDate) {
      const from = new Date(bookingData.fromDate);
      const to = new Date(bookingData.toDate);
      
      // Calculate difference in days
      const timeDiff = to.getTime() - from.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // +1 to include both start and end dates
      
      setTotalDays(daysDiff > 0 ? daysDiff : 0);
    } else {
      setTotalDays(0);
    }
  }, [bookingData.fromDate, bookingData.toDate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ UPDATED CALCULATION LOGIC
  // If dates are not selected (totalDays is 0), calculate for 1 day
  const calculateProductTotal = (product) => {
    const pricePerDay = parseInt(product.price);
    const daysToCalculate = totalDays > 0 ? totalDays : 1; 
    return pricePerDay * product.quantity * daysToCalculate;
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, product) => {
      return total + calculateProductTotal(product);
    }, 0);
  };

  const calculateDeliveryCharge = () => {
    const total = calculateTotal();
    return Math.max(200, total * 0.05);
  };

  const calculateFinalTotal = () => {
    return calculateTotal() + calculateDeliveryCharge();
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const downloadPDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add header
    pdf.setFillColor(25, 118, 210);
    pdf.rect(0, 0, 210, 30, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Booking Confirmation', 105, 18, { align: 'center' });
    
    // Reset text color
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');

    let yPosition = 40;

    // Booking ID and Date
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Booking ID: #${bookingId}`, 20, yPosition);
    pdf.text(`Booking Date: ${new Date().toLocaleDateString()}`, 120, yPosition);
    yPosition += 15;

    // Event Details
    pdf.setFontSize(14);
    pdf.text('Event Details:', 20, yPosition);
    yPosition += 8;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Event: ${eventName}`, 20, yPosition);
    yPosition += 6;
    
    // Only show Tamil name if it's simple ASCII characters (fallback)
    if (eventTamilName && /^[a-zA-Z0-9\s]*$/.test(eventTamilName)) {
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Tamil Name: ${eventTamilName}`, 20, yPosition);
      yPosition += 6;
    }
    yPosition += 9;

    // Customer Details
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Customer Details:', 20, yPosition);
    yPosition += 8;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Name: ${bookingData.fullName}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Mobile: ${bookingData.mobile}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Booking Period: ${bookingData.fromDate} to ${bookingData.toDate} (${totalDays} days)`, 20, yPosition);
    yPosition += 10;

    // Address (with word wrap)
    pdf.text('Delivery Address:', 20, yPosition);
    yPosition += 6;
    const addressLines = pdf.splitTextToSize(bookingData.address, 170);
    pdf.text(addressLines, 20, yPosition);
    yPosition += (addressLines.length * 6) + 10;

    // Products Summary
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Products Summary:', 20, yPosition);
    yPosition += 10;

    // Table Headers
    pdf.setFillColor(240, 240, 240);
    pdf.rect(20, yPosition, 170, 8, 'F');
    pdf.text('Product Name', 22, yPosition + 6);
    pdf.text('Qty', 100, yPosition + 6);
    pdf.text('Days', 115, yPosition + 6);
    pdf.text('Price/Day', 135, yPosition + 6);
    pdf.text('Total', 165, yPosition + 6);
    yPosition += 12;

    // Products List
    selectedProducts.forEach((product, index) => {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      
      // Product name (English only to avoid encoding issues)
      const productName = product.name.length > 25 ? product.name.substring(0, 25) + '...' : product.name;
      pdf.text(productName, 22, yPosition + 4);
      
      // Product details
      pdf.text(product.quantity.toString(), 100, yPosition + 4);
      pdf.text(totalDays.toString(), 115, yPosition + 4);
      pdf.text(`₹${product.price}`, 135, yPosition + 4);
      pdf.text(`₹${calculateProductTotal(product)}`, 165, yPosition + 4);
      
      yPosition += 8;

      // Add separator line
      if (index < selectedProducts.length - 1) {
        pdf.setDrawColor(200, 200, 200);
        pdf.line(20, yPosition, 190, yPosition);
        yPosition += 5;
      }
    });

    yPosition += 10;

    // Price Summary
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Price Summary:', 20, yPosition);
    yPosition += 8;

    pdf.setFont('helvetica', 'normal');
    pdf.text('Products Total:', 135, yPosition);
    pdf.text(`₹${calculateTotal()}`, 165, yPosition);
    yPosition += 6;

    pdf.text('Delivery Charge:', 135, yPosition);
    pdf.text(`₹${calculateDeliveryCharge()}`, 165, yPosition);
    yPosition += 8;

    // Final Total
    pdf.setDrawColor(0, 0, 0);
    pdf.line(125, yPosition, 190, yPosition);
    yPosition += 6;

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Final Amount:', 135, yPosition);
    pdf.text(`₹${calculateFinalTotal()}`, 165, yPosition);
    yPosition += 15;

    // Footer Note
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'italic');
    const noteText = pdf.splitTextToSize(
      'Note: This is a computer-generated receipt. No signature required. Our team will contact you within 1 hour to confirm the booking and discuss delivery details.',
      170
    );
    pdf.text(noteText, 20, yPosition);

    // Save the PDF
    pdf.save(`booking-confirmation-${bookingId}.pdf`);
  };

  // ✅ UPDATED: Save to MongoDB
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!bookingData.fullName || !bookingData.address || !bookingData.locationLink || !bookingData.mobile || !bookingData.fromDate || !bookingData.toDate) {
      alert('Please fill all required fields');
      return;
    }
    if (bookingData.mobile.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    if (totalDays <= 0) {
      alert('Please select valid booking dates. End date should be after start date.');
      return;
    }

    // Get user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (!currentUser) {
      alert('You must be logged in to make a booking. Redirecting to login...');
      navigate('/login');
      return;
    }

    const newBookingId = Date.now();
    setBookingId(newBookingId);

    const booking = {
      id: newBookingId,
      userEmail: currentUser.email,
      userName: currentUser.name,
      eventType,
      eventName,
      eventTamilName,
      products: selectedProducts,
      ...bookingData,
      totalDays: totalDays,
      total: calculateTotal(),
      deliveryCharge: calculateDeliveryCharge(),
      finalTotal: calculateFinalTotal(),
      status: 'Pending',
      timestamp: new Date().toISOString(),
      district: 'Erode'
    };

    try {
      console.log('📤 Sending booking to backend...', booking);
      
      // ✅ SAVE TO MONGODB BACKEND
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save booking');
      }

      const result = await response.json();
      console.log('✅ Booking saved to MongoDB:', result);

      // ✅ ALSO SAVE TO LOCALSTORAGE FOR FRONTEND
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      localStorage.setItem('bookings', JSON.stringify([...existingBookings, booking]));
      
      // Clear cart
      localStorage.removeItem('cart');
      localStorage.removeItem('cartEventType');
      window.dispatchEvent(new Event('storage'));

      setBookingSuccess(true);
      setActiveStep(2);

    } catch (error) {
      console.error('❌ Error saving booking:', error);
      alert(`Failed to save booking: ${error.message}. Please try again.`);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              📋 Order Summary
            </Typography>
            
            <Paper sx={{ p: 3, mb: 3, bgcolor: '#E3F2FD' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Event: {eventName}
              </Typography>
              {eventTamilName && (
                <Typography variant="body1" color="text.secondary">
                  {eventTamilName}
                </Typography>
              )}
            </Paper>

            {/* Date Range Summary */}
            {bookingData.fromDate && bookingData.toDate && totalDays > 0 && (
              <Paper sx={{ p: 2, mb: 3, bgcolor: '#fff3e0' }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#f57c00' }}>
                  📅 Booking Period
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">From Date:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {bookingData.fromDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">To Date:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {bookingData.toDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">Total Days:</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                      {totalDays} days
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            )}

            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Selected Products ({selectedProducts.length})
            </Typography>
            <List sx={{ mb: 3 }}>
              {selectedProducts.map((product, index) => (
                <React.Fragment key={product.id}>
                  <ListItem sx={{ px: 0, py: 2 }}>
                    <ListItemText
                      primary={
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {product.name}
                          </Typography>
                          {product.tamilName && (
                            <Typography variant="body2" color="text.secondary">
                              {product.tamilName}
                            </Typography>
                          )}
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Chip 
                            label={`Quantity: ${product.quantity}`} 
                            size="small" 
                            variant="outlined"
                            sx={{ mr: 1 }}
                          />
                          <Chip 
                            label={`₹${product.price} per day`} 
                            size="small" 
                            color="primary"
                            sx={{ mr: 1 }}
                          />
                          <Chip 
                            label={`${totalDays > 0 ? totalDays : 1} days`} 
                            size="small" 
                            variant="outlined"
                            color="secondary"
                            sx={{ mr: 1 }}
                          />
                          <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold', color: '#1976d2' }}>
                            Subtotal: ₹{calculateProductTotal(product)}
                            {` (₹${product.price} × ${product.quantity} × ${totalDays > 0 ? totalDays : 1} days)`}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < selectedProducts.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>

            <Paper sx={{ p: 3, bgcolor: '#f8f9fa' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                💰 Price Summary
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Duration:</Typography>
                <Typography sx={{ fontWeight: 'bold', color: totalDays > 0 ? 'text.primary' : 'orange' }}>
                  {totalDays > 0 ? `${totalDays} days` : '1 Day (Base Price)'}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Products Total:</Typography>
                <Typography>₹{calculateTotal()}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Delivery Charge:</Typography>
                <Typography>₹{calculateDeliveryCharge()}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Final Total:</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  ₹{calculateFinalTotal()}
                </Typography>
              </Box>
              
              {totalDays === 0 && (
                 <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                   * Final price depends on dates selected in next step.
                 </Typography>
              )}
            </Paper>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              👤 Customer Details
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Please provide your details for delivery and confirmation
            </Typography>

            <Box component="form">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name *"
                    name="fullName"
                    value={bookingData.fullName}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    placeholder="Enter your full name"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Complete Address in Erode District *"
                    name="address"
                    value={bookingData.address}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                    required
                    variant="outlined"
                    placeholder="Enter your complete address with area, street, landmark..."
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Google Maps Location Link *"
                    name="locationLink"
                    value={bookingData.locationLink}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    placeholder="Paste Google Maps link or share location details"
                    helperText="This helps us with accurate delivery"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Mobile Number *"
                    name="mobile"
                    value={bookingData.mobile}
                    onChange={handleInputChange}
                    inputProps={{ maxLength: 10 }}
                    required
                    variant="outlined"
                    placeholder="10-digit mobile number"
                  />
                </Grid>

                {/* Date Range Selection */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="From Date *"
                    name="fromDate"
                    type="date"
                    value={bookingData.fromDate}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                    variant="outlined"
                    inputProps={{
                      min: new Date().toISOString().split('T')[0] // Today's date
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="To Date *"
                    name="toDate"
                    type="date"
                    value={bookingData.toDate}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                    variant="outlined"
                    inputProps={{
                      min: bookingData.fromDate || new Date().toISOString().split('T')[0]
                    }}
                  />
                </Grid>

                {/* Days Calculation Display */}
                {totalDays > 0 && (
                  <Grid item xs={12}>
                    <Alert severity="info">
                      <Typography variant="body2">
                        <strong>Booking Period:</strong> {totalDays} days 
                        ({bookingData.fromDate} to {bookingData.toDate})
                      </Typography>
                    </Alert>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              ✅ Booking Confirmation
            </Typography>
            
            {bookingSuccess ? (
              <Alert severity="success" sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  🎉 Booking Confirmed Successfully!
                </Typography>
                <Typography>
                  Your booking ID: <strong>#{bookingId}</strong>
                </Typography>
                <Typography>
                  We will contact you shortly at {bookingData.mobile} for confirmation.
                </Typography>
              </Alert>
            ) : (
              <Alert severity="info" sx={{ mb: 3 }}>
                Please review your booking details before confirming.
              </Alert>
            )}

            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Booking Summary
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Booking ID:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>#{bookingId}</Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Event:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {eventName}
                  </Typography>
                  {eventTamilName && (
                    <Typography variant="body2" color="text.secondary">
                      {eventTamilName}
                    </Typography>
                  )}
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Customer:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {bookingData.fullName}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Mobile:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {bookingData.mobile}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Booking Period:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {bookingData.fromDate} to {bookingData.toDate}
                  </Typography>
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                    ({totalDays} days)
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Delivery Address:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {bookingData.address}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Products Summary ({totalDays} days)
              </Typography>
              {selectedProducts.map((product) => (
                <Box key={product.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {product.name}
                    </Typography>
                    {product.tamilName && (
                      <Typography variant="body2" color="text.secondary">
                        {product.tamilName}
                      </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                      {product.quantity} × ₹{product.price}/day × {totalDays} days
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    ₹{calculateProductTotal(product)}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Products Total:</Typography>
                <Typography>₹{calculateTotal()}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Delivery Charge:</Typography>
                <Typography>₹{calculateDeliveryCharge()}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Final Amount:
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  ₹{calculateFinalTotal()}
                </Typography>
              </Box>
            </Paper>

            {bookingSuccess && (
              <Alert severity="warning">
                <Typography variant="body2">
                  📞 Our team will contact you within 1 hour to confirm the booking and discuss delivery details.
                </Typography>
              </Alert>
            )}
          </Box>
        );

      default:
        return (
          <Box>
            <Alert severity="error">
              <Typography variant="h6">
                Something went wrong!
              </Typography>
              <Typography>
                Please go back and try again.
              </Typography>
            </Alert>
            <Button 
              variant="contained" 
              onClick={() => setActiveStep(0)}
              sx={{ mt: 2 }}
            >
              Go to First Step
            </Button>
          </Box>
        );
    }
  };

  if (selectedProducts.length === 0 && activeStep === 0) {
    return (
      <Container>
        <Typography variant="h5" align="center" sx={{ mt: 4 }}>
          No products selected. Please go back and select products.
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/categories')}
          sx={{ mt: 2, display: 'block', mx: 'auto' }}
        >
          Browse Categories
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            color: '#1976d2'
          }}
        >
          Booking for {eventName}
        </Typography>
        {eventTamilName && (
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#d32f2f',
              mb: 2
            }}
          >
            {eventTamilName}
          </Typography>
        )}
      </Box>

      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      <Paper sx={{ p: 4, border: '2px solid #1976d2', borderRadius: 3 }}>
        {getStepContent(activeStep)}

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, gap: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            size="medium"
            sx={{ 
              minWidth: '100px',
              px: 2
            }}
          >
            Back
          </Button>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            {activeStep === steps.length - 1 ? (
              bookingSuccess ? (
                <>
                  <Button
                    variant="contained"
                    onClick={downloadPDF}
                    size="medium"
                    sx={{ 
                      bgcolor: '#d32f2f',
                      minWidth: '140px',
                      px: 3,
                      fontSize: '0.9rem',
                      '&:hover': { 
                        bgcolor: '#c62828',
                        transform: 'translateY(-1px)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    📄 Download PDF
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/')}
                    size="medium"
                    sx={{ 
                      minWidth: '140px',
                      px: 3,
                      fontSize: '0.9rem'
                    }}
                  >
                    🏠 Go Home
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  size="medium"
                  sx={{ 
                    bgcolor: '#1976d2',
                    minWidth: '140px',
                    px: 3,
                    fontSize: '0.9rem',
                    '&:hover': { 
                      bgcolor: '#1565c0',
                      transform: 'translateY(-1px)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  Confirm Booking
                </Button>
              )
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                size="medium"
                disabled={
                  (activeStep === 1 && 
                  (!bookingData.fullName || !bookingData.address || !bookingData.locationLink || !bookingData.mobile || !bookingData.fromDate || !bookingData.toDate))
                }
                sx={{ 
                  bgcolor: '#1976d2',
                  minWidth: '100px',
                  px: 3,
                  fontSize: '0.9rem',
                  '&:hover': { 
                    bgcolor: '#1565c0',
                    transform: 'translateY(-1px)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                {activeStep === steps.length - 2 ? 'Review' : 'Next'}
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Additional Info */}
      {activeStep === 1 && (
        <Alert severity="info" sx={{ mt: 3 }}>
          <Typography variant="body2">
            💡 <strong>Booking Information:</strong> Prices are calculated per day. 
            Select your booking period to see the total amount. We deliver across Erode district.
          </Typography>
        </Alert>
      )}
    </Container>
  );
};

export default Booking;