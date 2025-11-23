// backend/routes/productCategoryRoutes.js

const express = require('express');
const router = express.Router();
const ProductCategory = require('../models/ProductCategory.js'); // Namma ProductCategory Model

// GET /api/product-categories/
// Yella product categories-ayum database la irunthu eduthutu varum
router.get('/', async (req, res) => {
    try {
        const categories = await ProductCategory.find({});
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;