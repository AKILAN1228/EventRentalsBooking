import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Card,
  CardContent,
  Chip,
  alpha,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Celebration,
  MusicNote,
  LocalFlorist,
  Restaurant,
  Groups,
  EmojiEvents,
  Star,
  ArrowForward,
  VolumeUp,
  Chair,
  Lightbulb,
  ExpandMore,
  Favorite,
  Diamond,
  CheckCircle,
  Close,
} from '@mui/icons-material';

const Home = () => {
  const [specsDialogOpen, setSpecsDialogOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
    setSpecsDialogOpen(true);
  };

  const handleCloseSpecsDialog = () => {
    setSpecsDialogOpen(false);
    setSelectedFeature(null);
  };

  // Features data with specifications
  const features = [
    { 
      icon: <Chair sx={{ fontSize: 40 }} />, 
      title: 'Luxury Furniture', 
      description: 'Premium quality furniture for all types of events and gatherings',
      specifications: [
        'Premium Wooden Chairs with Cushions',
        'Elegant Dining Tables (6ft, 8ft, 10ft)',
        'Sofa Sets (3+1+1, 2+1+1 configurations)',
        'Dining Chairs with Upholstery',
        'Coffee Tables and Side Tables',
        'Bar Stools and Counter Chairs',
        'Outdoor Garden Furniture',
        'VIP Lounge Furniture Sets',
        'Folding Chairs for large gatherings',
        'Customizable furniture arrangements'
      ]
    },
    { 
      icon: <VolumeUp sx={{ fontSize: 40 }} />, 
      title: 'Audio Systems', 
      description: 'Crystal clear sound systems for perfect audio experience',
      specifications: [
        'Line Array Speakers (1000W, 2000W, 5000W)',
        'Digital Mixing Consoles (16-32 channels)',
        'Wireless Microphones (Handheld, Lapel, Headset)',
        'Wired Microphones for clear vocals',
        'Power Amplifiers (Professional grade)',
        'Monitor Speakers for stage',
        'Subwoofers for deep bass',
        'Audio Processors and Equalizers',
        'DJ Equipment Setup',
        'Background Music Systems'
      ]
    },
    { 
      icon: <Lightbulb sx={{ fontSize: 40 }} />, 
      title: 'Lighting', 
      description: 'Professional lighting setups to create the perfect ambiance',
      specifications: [
        'LED Par Lights (RGBW, 54x3W)',
        'Moving Head Lights (Beam, Wash, Spot)',
        'DMX Lighting Controllers',
        'Stage Wash Lights',
        'Uplighting for walls and decor',
        'Intelligent Lighting Systems',
        'Gobo Projectors with custom patterns',
        'Strobe Lights and Effects',
        'Laser Light Systems',
        'Atmospheric Fog Machines'
      ]
    },
    { 
      icon: <LocalFlorist sx={{ fontSize: 40 }} />, 
      title: 'Decorations', 
      description: 'Beautiful decorations that transform any venue',
      specifications: [
        'Fresh Flower Arrangements',
        'Artificial Flower Decor',
        'Theme-based Backdrops',
        'Fabric Draping and Ceiling Decor',
        'Centerpieces and Table Decor',
        'Entrance Arch Designs',
        'Balloon Decorations',
        'Rangoli and Traditional Decor',
        'LED Curtains and Wall Panels',
        'Custom Signage and Welcome Boards'
      ]
    },
    { 
      icon: <EmojiEvents sx={{ fontSize: 40 }} />, 
      title: 'Stage Setup', 
      description: 'Complete stage arrangements for all event types',
      specifications: [
        'Modular Stage Platforms (4x4 ft, 4x8 ft)',
        'Stage Skirting and Coverings',
        'Backdrop Support Systems',
        'Red Carpet and Runner',
        'Podium and Lectern',
        'Stage Steps and Ramps',
        'Safety Railings',
        'Custom Stage Designs',
        'Multi-level Stage Setup',
        'Dance Floor Installations'
      ]
    },
    { 
      icon: <Groups sx={{ fontSize: 40 }} />, 
      title: 'Expert Team', 
      description: 'Experienced professionals to handle your event setup',
      specifications: [
        'Certified Event Technicians',
        'Audio Engineers with 5+ years experience',
        'Lighting Programmers and Operators',
        'Setup and Dismantle Crew',
        'On-site Technical Support',
        'Event Managers and Coordinators',
        'Safety and Security Personnel',
        '24/7 Customer Support',
        'Quality Control Team',
        'Emergency Response Team'
      ]
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#ffffff' }}>
      {/* Enhanced Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 15 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.2,
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Chip 
            label="Premium Event Services" 
            sx={{ 
              bgcolor: alpha('#fff', 0.2), 
              color: 'white', 
              mb: 3,
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }} 
          />
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{ 
              fontWeight: 'bold', 
              fontSize: { xs: '2.5rem', md: '4rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: 3
            }}
          >
            SIVASHAKTHI KALYAAN STORE
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{ 
              mb: 5, 
              maxWidth: '800px', 
              mx: 'auto', 
              opacity: 0.95,
              fontWeight: 300,
              lineHeight: 1.6
            }}
          >
            Transform your special Functions with Neat furniture, audio systems, 
            and elegant decorations for weddings and events that create unforgettable experiences.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/categories"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: 'white',
                color: '#764ba2',
                fontSize: '1.1rem',
                px: 5,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: '#f5f5f5',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              BROWSE EQUIPMENT
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/gallery"
              sx={{
                borderColor: 'white',
                color: 'white',
                fontSize: '1.1rem',
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: alpha('#fff', 0.1),
                  borderColor: 'white',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              VIEW GALLERY
            </Button>
          </Box>
          
          {/* Stats Section */}
          <Grid container spacing={4} sx={{ mt: 8 }}>
            {[
              { icon: <Celebration />, number: '500+', label: 'Events Served' },
              { icon: <MusicNote />, number: '100+', label: 'Audio Systems' },
              { icon: <LocalFlorist />, number: '50+', label: 'Decoration Themes' },
              { icon: <Groups />, number: '98%', label: 'Client Satisfaction' },
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ color: 'white', mb: 1 }}>{stat.icon}</Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip 
            label="Why Choose Us" 
            color="primary" 
            sx={{ mb: 2, fontWeight: 'bold' }} 
          />
          <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
            Premium Quality Services
          </Typography>
          <Typography variant="h6" sx={{ color: '#666', maxWidth: '600px', mx: 'auto' }}>
            We provide the finest event equipment with professional service
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                onClick={() => handleFeatureClick(feature)}
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  transition: 'all 0.3s ease',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 35px rgba(25, 118, 210, 0.15)',
                    borderColor: 'primary.main',
                  }
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      color: 'white',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {feature.description}
                  </Typography>
                  
                  {/* Click hint */}
                  <Box sx={{ mt: 2 }}>
                    <Chip 
                      label="Click for Specifications" 
                      variant="outlined" 
                      size="small"
                      color="primary"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Specifications Dialog */}
      <Dialog
        open={specsDialogOpen}
        onClose={handleCloseSpecsDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
              {selectedFeature?.title} Specifications
            </Typography>
            <Button
              onClick={handleCloseSpecsDialog}
              sx={{ minWidth: 'auto', p: 1 }}
            >
              <Close />
            </Button>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          {selectedFeature && (
            <Box>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                {selectedFeature.description}
              </Typography>
              
              <Divider sx={{ mb: 3 }} />
              
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
                Available Equipment & Services:
              </Typography>
              
              <List>
                {selectedFeature.specifications.map((spec, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={spec}
                      primaryTypographyProps={{ variant: 'body1' }}
                    />
                  </ListItem>
                ))}
              </List>
              
              <Box sx={{ mt: 3, p: 2, bgcolor: 'primary.light', borderRadius: 2 }}>
                <Typography variant="body2" sx={{ color: 'white', textAlign: 'center' }}>
                  💡 <strong>Pro Tip:</strong> All our equipment comes with professional setup, 
                  maintenance, and on-site support throughout your event.
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleCloseSpecsDialog}
            variant="outlined"
          >
            Close
          </Button>
          <Button 
            variant="contained"
            component={Link}
            to="/categories"
            onClick={handleCloseSpecsDialog}
          >
            Browse All Equipment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Select Event Type Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Chip 
              label="Our Services" 
              color="primary" 
              sx={{ mb: 2, fontWeight: 'bold' }} 
            />
            <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
              Select Event Type
            </Typography>
            <Typography variant="h6" sx={{ color: '#666', maxWidth: '600px', mx: 'auto' }}>
              தமிழ்நாட்டில் பிரபலமான அனைத்து நிகழ்வு வகைகளும்
            </Typography>
          </Box>

          {/* Marriage Department Section */}
          <Box sx={{ mb: 6 }}>
            <Accordion 
              defaultExpanded 
              sx={{ 
                bgcolor: 'primary.main', 
                color: 'white',
                borderRadius: '12px !important',
                overflow: 'hidden',
                '&:before': { display: 'none' }
              }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMore sx={{ color: 'white' }} />}
                sx={{ 
                  bgcolor: 'primary.main',
                  py: 3,
                  '& .MuiAccordionSummary-content': {
                    alignItems: 'center',
                    gap: 2
                  }
                }}
              >
                <Favorite sx={{ fontSize: 32 }} />
                <Box>
                  <Typography variant="h4" component="h3" sx={{ fontWeight: 'bold' }}>
                    Marriage Department
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 300 }}>
                    Complete wedding services including engagement and reception
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: 'white', p: 0 }}>
                <Grid container spacing={3} sx={{ p: 3 }}>
                  {marriageEvents.map((event, index) => (
                    <Grid item xs={12} sm={6} md={4} key={event.type}>
                      <MarriageEventCard event={event} index={index} />
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* Other Events Section */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" component="h3" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
              Other Events
            </Typography>
            <Typography variant="h6" sx={{ color: '#666', mb: 4 }}>
              Professional setups for all types of celebrations
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            {otherEvents.map((event, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={event.type}>
                <EventCard event={event} index={index} />
              </Grid>
            ))}
          </Grid>
          
          {/* CTA Section */}
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h5" sx={{ mb: 3, color: 'text.primary', fontWeight: 'medium' }}>
              Can't find what you're looking for?
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/contact"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: 'primary.main',
                fontSize: '1.1rem',
                px: 6,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)',
                },
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

// Marriage Event Card Component
const MarriageEventCard = ({ event, index }) => (
  <Card
    component={Link}
    to={`/products/${event.type}`}
    sx={{
      height: '100%',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      border: '2px solid',
      borderColor: 'primary.light',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 15px 35px rgba(25, 118, 210, 0.2)',
        borderColor: 'primary.main',
        '& .event-emoji': {
          transform: 'scale(1.1)',
        }
      }
    }}
  >
    {/* Special Marriage Badge */}
    <Box
      sx={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 2,
      }}
    >
      <Chip
        icon={<Diamond sx={{ fontSize: 16 }} />}
        label="Marriage"
        color="primary"
        size="small"
        sx={{ fontWeight: 'bold' }}
      />
    </Box>
    
    <CardContent sx={{ 
      p: 3, 
      textAlign: 'center', 
      flexGrow: 1, 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      zIndex: 1,
    }}>
      <Box
        className="event-emoji"
        sx={{
          width: 70,
          height: 70,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${getEventColor(event.type).primary} 0%, ${getEventColor(event.type).secondary} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 2,
          transition: 'transform 0.3s ease',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h4" sx={{ color: 'white' }}>
          {event.emoji}
        </Typography>
      </Box>
      
      <Typography variant="h6" component="h3" sx={{ 
        fontWeight: 'bold', 
        color: 'primary.main',
        mb: 1 
      }}>
        {event.name}
      </Typography>
      
      <Typography variant="body2" sx={{ 
        color: '#d32f2f', 
        fontWeight: '600', 
        mb: 1,
        fontSize: '0.8rem'
      }}>
        {event.tamilName}
      </Typography>
      
      <Typography variant="body2" sx={{ 
        color: 'text.secondary', 
        flexGrow: 1, 
        mb: 2,
        fontSize: '0.9rem',
        lineHeight: 1.4
      }}>
        {event.description}
      </Typography>
      
      <Box sx={{ mt: 'auto' }}>
        <Chip
          label={event.popularity}
          color={getPopularityColor(event.popularity)}
          size="small"
          variant="outlined"
          sx={{ fontWeight: 'bold' }}
        />
      </Box>
    </CardContent>
  </Card>
);

// Regular Event Card Component
const EventCard = ({ event, index }) => (
  <Card
    component={Link}
    to={`/products/${event.type}`}
    sx={{
      height: '100%',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 15px 35px rgba(25, 118, 210, 0.2)',
        '& .event-emoji': {
          transform: 'scale(1.1)',
        }
      }
    }}
  >
    {/* Popularity Badge */}
    {event.popularity === 'Most Popular' && (
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 2,
        }}
      >
        <Chip
          icon={<Star sx={{ fontSize: 16 }} />}
          label="Trending"
          color="error"
          size="small"
          sx={{ fontWeight: 'bold' }}
        />
      </Box>
    )}
    
    <CardContent sx={{ 
      p: 3, 
      textAlign: 'center', 
      flexGrow: 1, 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      zIndex: 1,
    }}>
      <Box
        className="event-emoji"
        sx={{
          width: 70,
          height: 70,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${getEventColor(event.type).primary} 0%, ${getEventColor(event.type).secondary} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 2,
          transition: 'transform 0.3s ease',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h4" sx={{ color: 'white' }}>
          {event.emoji}
        </Typography>
      </Box>
      
      <Typography variant="h6" component="h3" sx={{ 
        fontWeight: 'bold', 
        color: 'primary.main',
        mb: 1 
      }}>
        {event.name}
      </Typography>
      
      <Typography variant="body2" sx={{ 
        color: '#d32f2f', 
        fontWeight: '600', 
        mb: 1,
        fontSize: '0.8rem'
      }}>
        {event.tamilName}
      </Typography>
      
      <Typography variant="body2" sx={{ 
        color: 'text.secondary', 
        flexGrow: 1, 
        mb: 2,
        fontSize: '0.9rem',
        lineHeight: 1.4
      }}>
        {event.description}
      </Typography>
      
      <Box sx={{ mt: 'auto' }}>
        <Chip
          label={event.popularity}
          color={getPopularityColor(event.popularity)}
          size="small"
          variant="outlined"
          sx={{ fontWeight: 'bold' }}
        />
      </Box>
    </CardContent>
  </Card>
);

// Helper function to get event colors
const getEventColor = (eventType) => {
  const colors = {
    wedding: { primary: '#e91e63', secondary: '#ad1457' },
    reception: { primary: '#9c27b0', secondary: '#6a1b9a' },
    engagement: { primary: '#673ab7', secondary: '#4527a0' },
    'temple-function': { primary: '#3f51b5', secondary: '#283593' },
    birthday: { primary: '#2196f3', secondary: '#1565c0' },
    'house-warming': { primary: '#00bcd4', secondary: '#00838f' },
    'music-concert': { primary: '#009688', secondary: '#00695c' },
    'corporate-event': { primary: '#4caf50', secondary: '#2e7d32' },
    'annual-day': { primary: '#ff9800', secondary: '#ef6c00' },
    'baby-shower': { primary: '#ff5722', secondary: '#d84315' },
    'political-rally': { primary: '#795548', secondary: '#4e342e' },
    exhibition: { primary: '#607d8b', secondary: '#37474f' },
    'cultural-event': { primary: '#f44336', secondary: '#c62828' },
    seminar: { primary: '#8bc34a', secondary: '#558b2f' },
    funeral: { primary: '#757575', secondary: '#424242' },
  };
  return colors[eventType] || { primary: '#1976d2', secondary: '#1565c0' };
};

// Helper function to get popularity chip color
const getPopularityColor = (popularity) => {
  const colors = {
    'Most Popular': 'error',
    'Very Popular': 'warning',
    'Popular': 'primary',
    'Common': 'success',
    'Growing': 'info',
    'Seasonal': 'secondary',
    'Regular': 'default',
    'Essential': 'error',
  };
  return colors[popularity] || 'default';
};

// Marriage Department Events
const marriageEvents = [
  { 
    type: 'wedding', 
    name: 'Wedding', 
    tamilName: 'கல்யாணம்', 
    description: 'Complete wedding arrangements with traditional ceremonies', 
    emoji: '💒', 
    popularity: 'Most Popular' 
  },
  { 
    type: 'reception', 
    name: 'Reception', 
    tamilName: 'ரிசப்ஷன்', 
    description: 'Grand reception party setups after wedding', 
    emoji: '🎊', 
    popularity: 'Popular' 
  },
  { 
    type: 'engagement', 
    name: 'Engagement', 
    tamilName: 'நிச்சயதார்த்தம்', 
    description: 'Intimate engagement ceremonies and ring exchange', 
    emoji: '💍', 
    popularity: 'Popular' 
  },
];

// Other Events
const otherEvents = [
  { 
    type: 'temple-function', 
    name: 'Temple Function', 
    tamilName: 'கோவில் உற்சவம்', 
    description: 'Traditional temple event setups', 
    emoji: '🛕', 
    popularity: 'Very Popular' 
  },
  { 
    type: 'ear-piercing', 
    name: 'Ear Piercing', 
    tamilName: 'காது குத்து விழா', 
    description: 'Setups for traditional ear piercing ceremonies', 
    emoji: '👂', 
    popularity: 'Common' 
  },
  { 
    type: 'keda-vettu', 
    name: 'Keda Vettu', 
    tamilName: 'கிடா வெட்டு', 
    description: 'Arrangements for large family feasts', 
    emoji: '🐐', 
    popularity: 'Seasonal' 
  },
  { 
    type: 'birthday', 
    name: 'Birthday Party', 
    tamilName: 'பிறந்தநாள் விழா', 
    description: 'Fun party decorations and themes', 
    emoji: '🎂', 
    popularity: 'Popular' 
  },
  { 
    type: 'house-warming', 
    name: 'House Warming', 
    tamilName: 'கிருகப்பிரவேசம்', 
    description: 'Traditional house warming events', 
    emoji: '🏠', 
    popularity: 'Common' 
  },
  { 
    type: 'music-concert', 
    name: 'Music Concert', 
    tamilName: 'இசை கச்சேரி', 
    description: 'Stage and sound for concerts', 
    emoji: '🎵', 
    popularity: 'Popular' 
  },
  { 
    type: 'corporate-event', 
    name: 'Corporate Event', 
    tamilName: 'நிறுவன நிகழ்வு', 
    description: 'Professional corporate setups', 
    emoji: '💼', 
    popularity: 'Growing' 
  },
  { 
    type: 'annual-day', 
    name: 'Annual Day', 
    tamilName: 'வருடாந்திர தினம்', 
    description: 'School & college annual days', 
    emoji: '🎓', 
    popularity: 'Seasonal' 
  },
  { 
    type: 'baby-shower', 
    name: 'Baby Shower', 
    tamilName: 'சீமந்தம்', 
    description: 'Traditional baby shower events', 
    emoji: '👶', 
    popularity: 'Common' 
  },
  { 
    type: 'political-rally', 
    name: 'Political Rally', 
    tamilName: 'அரசியல் கூட்டம்', 
    description: 'Large scale rally arrangements', 
    emoji: '🗳️', 
    popularity: 'Seasonal' 
  },
  { 
    type: 'exhibition', 
    name: 'Exhibition', 
    tamilName: 'கண்காட்சி', 
    description: 'Trade shows and exhibition stalls', 
    emoji: '🎪', 
    popularity: 'Regular' 
  },
  { 
    type: 'cultural-event', 
    name: 'Cultural Event', 
    tamilName: 'கலாச்சார நிகழ்வு', 
    description: 'Traditional cultural programs', 
    emoji: '🎭', 
    popularity: 'Popular' 
  },
  { 
    type: 'seminar', 
    name: 'Seminar', 
    tamilName: 'கருத்தரங்கு', 
    description: 'Educational seminar setups', 
    emoji: '📚', 
    popularity: 'Regular' 
  },
  { 
    type: 'funeral', 
    name: 'Funeral Ceremony', 
    tamilName: 'இறுதி சடங்கு', 
    description: 'Respectful funeral arrangements', 
    emoji: '☮️', 
    popularity: 'Essential' 
  }
];

export default Home;