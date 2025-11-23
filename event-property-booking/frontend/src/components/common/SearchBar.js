import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  InputBase,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Box,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    query: '',
    category: '',
    location: '',
  });

  const eventCategories = [
    'All Categories',
    'Wedding',
    'Conference',
    'Birthday Party',
    'Concert',
    'Corporate Event',
    'Exhibition',
    'Seminar',
    'Reception'
  ];

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchData.category && searchData.category !== 'All Categories') {
      navigate('/products', { 
        state: { 
          search: searchData.query,
          category: searchData.category,
          location: searchData.location
        }
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 900, margin: '0 auto', p: 2 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        align="center" 
        gutterBottom
        sx={{ 
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 3
        }}
      >
        Find Perfect Event Equipment
      </Typography>
      
      <Paper
        component="form"
        onSubmit={handleSearch}
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          {/* Search Input */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: 2, p: 1 }}>
              <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <InputBase
                placeholder="Search equipment, venues..."
                name="query"
                value={searchData.query}
                onChange={handleChange}
                fullWidth
                sx={{ ml: 1 }}
              />
            </Box>
          </Grid>

          {/* Category Select */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: 2, p: 1 }}>
              <CategoryIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
                <Select
                  name="category"
                  value={searchData.category}
                  onChange={handleChange}
                  displayEmpty
                  disableUnderline
                >
                  <MenuItem value="">All Categories</MenuItem>
                  <MenuItem value="Stage Equipment">Stage Equipment</MenuItem>
                  <MenuItem value="Sound System">Sound System</MenuItem>
                  <MenuItem value="Lighting">Lighting</MenuItem>
                  <MenuItem value="Decoration">Decoration</MenuItem>
                  <MenuItem value="Furniture">Furniture</MenuItem>
                  <MenuItem value="Audio Visual">Audio Visual</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {/* Location Input */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: 2, p: 1 }}>
              <LocationOnIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <InputBase
                placeholder="Location"
                name="location"
                value={searchData.location}
                onChange={handleChange}
                fullWidth
                sx={{ ml: 1 }}
              />
            </Box>
          </Grid>

          {/* Search Button */}
          <Grid item xs={12} md={2}>
            <IconButton 
              type="submit" 
              sx={{ 
                p: 2, 
                background: 'white',
                color: 'primary.main',
                borderRadius: 2,
                width: '100%',
                height: '100%',
                '&:hover': {
                  background: '#f5f5f5',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                },
                transition: 'all 0.3s ease'
              }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>

      {/* Quick Category Tags */}
      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
        {['Stage', 'Sound', 'Lighting', 'Decoration', 'All'].map((category) => (
          <Paper
            key={category}
            onClick={() => setSearchData(prev => ({ ...prev, category }))}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 20,
              cursor: 'pointer',
              background: searchData.category === category ? 'primary.main' : 'grey.100',
              color: searchData.category === category ? 'white' : 'text.primary',
              '&:hover': {
                background: searchData.category === category ? 'primary.dark' : 'grey.200',
              },
              transition: 'all 0.3s ease',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            {category}
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default SearchBar;