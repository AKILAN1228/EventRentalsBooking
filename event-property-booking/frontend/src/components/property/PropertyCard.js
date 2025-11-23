import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const PropertyCard = ({ property }) => {
  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={property.images && property.images[0] ? property.images[0] : '/default-property.jpg'}
        alt={property.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {property.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
          {property.location}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {property.description ? property.description.substring(0, 100) + '...' : 'No description available'}
        </Typography>
        <div>
          <Chip 
            label={property.type} 
            color="primary" 
            size="small" 
            sx={{ mr: 1, mb: 1 }}
          />
          <Chip 
            label={`₹${property.price}/day`} 
            color="secondary" 
            size="small" 
          />
        </div>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          component={Link} 
          to={`/property/${property._id}`}
        >
          View Details
        </Button>
        <Button 
          size="small" 
          color="primary"
          component={Link}
          to={`/booking/${property._id}`}
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default PropertyCard;