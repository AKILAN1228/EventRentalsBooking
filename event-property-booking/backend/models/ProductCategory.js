// backend/models/ProductCategory.js
const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    emoji: { type: String, required: true }
});

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);
module.exports = ProductCategory;