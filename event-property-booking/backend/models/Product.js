// backend/models/Product.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tamilName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String, required: true, default: 'Per Day' },
    imageUrl: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    features: [String],
    productCategory: { 
        type: Schema.Types.ObjectId,
        ref: 'ProductCategory',
        required: true
    },
    eventTypes: [{ 
        type: Schema.Types.ObjectId,
        ref: 'EventType'
    }],
    isFeatured: { type: Boolean, default: false },
    totalStock: { 
        type: Number, 
        required: true, 
        default: 1 
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;