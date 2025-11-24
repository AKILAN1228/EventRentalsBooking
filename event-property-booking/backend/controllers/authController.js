const User = require('../models/User');
const jwt = require('jsonwebtoken');

// ✅ GENERATE JWT TOKEN
const generateToken = (userId) => {
  // Render-ல் JWT_SECRET செட் செய்யவில்லை என்றால் Default key எடுக்கும்
  const secret = process.env.JWT_SECRET || 'mysecretkey123'; 
  return jwt.sign({ userId }, secret, { expiresIn: '30d' });
};

// ✅ REGISTER USER LOGIC
const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    // 1. Check if user exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email' 
      });
    }

    // 2. Create User (Password hashed automatically in User Model)
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      mobile, // Mobile field correctly mapped
      isAdmin: email === 'admin@eventrentals.com' // Admin Logic
    });

    // 3. Generate Token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
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
};

// ✅ LOGIN USER LOGIC
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find User
    const user = await User.findOne({ email: email.toLowerCase() });

    // 2. Check Password
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      res.json({
        success: true,
        message: 'Login successful!',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
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
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};

module.exports = { registerUser, loginUser };