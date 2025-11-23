// // backend/server.js (FINAL VERSION)

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// // --- ITHA NAAN ADD PANNIRUKEN ---
// // Namma 5 routes files-ayum inga kondu varom
// const authRoutes = require('./routes/authRoutes.js'); 
// const eventTypeRoutes = require('./routes/eventTypeRoutes.js');
// const productCategoryRoutes = require('./routes/productCategoryRoutes.js');
// const productRoutes = require('./routes/productRoutes.js');
// const bookingRoutes = require('./routes/bookingRoutes.js');
// // --- MUDINJATHU ---

// // 1. Load environment variables (from .env file)
// dotenv.config();

// // 2. Initialize Express app
// const app = express();

// // 3. Middlewares
// app.use(cors()); // Allows your React app to talk to this server
// app.use(express.json()); // Allows server to understand JSON data

// // --- ITHA NAAN ADD PANNIRUKEN ---
// // API Routes
// // Ithu enna sollum na, '/api/auth' nu start aagura entha URL vanthalum,
// // atha namma 'authRoutes' file kitta anupu nu sollum.
// app.use('/api/auth', authRoutes); 
// app.use('/api/event-types', eventTypeRoutes);
// app.use('/api/product-categories', productCategoryRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/bookings', bookingRoutes);
// // --- MUDINJATHU ---

// // 4. Define PORT
// const PORT = process.env.PORT || 5000;

// // 5. Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     // Unga terminal la warning kaatuchu la? Athunala antha 2 line-ayum naan remove panniten.
//     // Ippo antha warning varathu.
// })
// .then(() => console.log('MongoDB connected successfully.'))
// .catch((err) => console.error('MongoDB connection error:', err));

// // 6. Basic Test Route
// app.get('/', (req, res) => {
//     res.send('Event Rentals API is running!');
// });

// // 7. Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port: ${PORT}`);
// });
// backend/server.js (UPDATED VERSION)

// backend/server.js (UPDATED)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ DEBUG: Log when routes are loaded
console.log('🔄 Loading routes...');

// API Routes
app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/event-types', require('./routes/eventTypeRoutes.js'));
app.use('/api/product-categories', require('./routes/productCategoryRoutes.js'));
app.use('/api/products', require('./routes/productRoutes.js'));
app.use('/api/bookings', require('./routes/bookingRoutes.js'));

console.log('✅ All routes loaded successfully!');

// Define PORT
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB Atlas Connected Successfully'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Basic Test Route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Event Rentals API is running!',
        timestamp: new Date(),
        database: 'MongoDB Atlas Connected'
    });
});

// Health Check Route
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        timestamp: new Date()
    });
});

// ✅ ADD THIS: Debug route to check all loaded routes
app.get('/api/debug-routes', (req, res) => {
    res.json({
        message: 'Available routes:',
        routes: [
            'GET  /api/health',
            'GET  /api/debug-routes',
            'POST /api/auth/register',
            'POST /api/auth/login', 
            'GET  /api/auth/test',
            'POST /api/bookings',
            'GET  /api/bookings/test-all',
            'GET  /api/bookings/my-bookings',
            'GET  /api/bookings/admin/all'
        ],
        timestamp: new Date()
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port: ${PORT}`);
    console.log(`📊 MongoDB URI: ${process.env.MONGO_URI ? 'Atlas Connected' : 'Check .env'}`);
});