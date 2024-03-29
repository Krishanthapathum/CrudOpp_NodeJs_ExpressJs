const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name']
        
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },  
    price: {
        type: Number,
        required: true,
        default: 0
    },
    Image: {
        type: String,
        required: false,
    },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;