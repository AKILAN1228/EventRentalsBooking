// backend/routes/productRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js');
const EventType = require('../models/EventType.js'); // Event 'type' (string) vechi ID-a kandupudika

// GET /api/products/
// Yella products-ayum database la irunthu eduthutu varum
// Itha namma search-kum use pannikalam (e.g., /api/products?event=wedding)
router.get('/', async (req, res) => {
    try {
        let query = {}; // Empty query na yella products-um varum

        // --- Ithu thaan unga Products.js page-oda magic ---
        // User /products/wedding nu click panna, 'eventType' varum
        if (req.query.eventType) {
            // 1. 'wedding' (string) vechi antha EventType-oda ID-a kandupidi
            const event = await EventType.findOne({ type: req.query.eventType });
            
            if (event) {
                // 2. Antha ID, Product model-oda 'eventTypes' array la irukka nu paaru
                query.eventTypes = event._id;
            }
        }
        
        // Inime namma search query kooda add pannalam (e.g., req.query.search)
        // Inime namma category filter kooda add pannalam (e.g., req.query.category)

        const products = await Product.find(query)
            .populate('productCategory') // Category details-a serthu anupu
            .populate('eventTypes'); // Event details-a serthu anupu
            
        res.json(products);
        
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// GET /api/products/featured
// Unga Home.js la kaatra 'Featured Products' kaga
router.get('/featured', async (req, res) => {
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).limit(3);
        res.json(featuredProducts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});


// GET /api/products/:id
// Oru thani product-oda details paaka (Product Details Page)
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('productCategory')
            .populate('eventTypes');

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});


// Inime namma Admin-ku 'create', 'update', 'delete' product routes inga eluthalam

module.exports = router;