const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    fabric: {
        type: String,
        default: '' 
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    images: {
        type: [ String ],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        required: true
    },
    options: [ optionSchema ]

}, {
    timestamps: true
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;