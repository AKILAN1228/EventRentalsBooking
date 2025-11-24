const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

// ✅ GENERATE JWT TOKEN
const generateToken = (userId) => {
  // குறிப்பு: Render-ல் JWT_SECRET என்விரான்மென்ட் variable செட் செய்ய வேண்டும்
  // இப்போதைக்கு ஒரு டீஃபால்ட் சீக்ரெட் வைத்திருக்கிறேன்
  const secret = process.env.JWT_SECRET || 'mysecretkey123'; 
  return jwt.sign({ userId }, secret, { expiresIn: '30d' });
};

// ✅ USER REGISTRATION
router.post('/register', async (req, res) => {
  try {
    // மாற்றம் 1: 'phone' என்பதற்கு பதில் 'mobile' என்று மாற்றப்பட்டுள்ளது
    const { name, email, password, mobile } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email' 
      });
    }

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      mobile, // மாற்றம் 2: இங்கேயும் mobile என்று இருக்க வேண்டும்
      isAdmin: email === 'admin@eventrentals.com' // அட்மின் லாஜிக்
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile, // மாற்றம் 3
        isAdmin: user.isAdmin
      },
      token, 
      timestamp: new Date()
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Registration failed',
      error: error.message 
    });
  }
});

// ✅ USER LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      res.json({
        success: true,
        message: 'Login successful!',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile, // மாற்றம் 4
          isAdmin: user.isAdmin
        },
        token, 
        timestamp: new Date()
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

module.exports = router;