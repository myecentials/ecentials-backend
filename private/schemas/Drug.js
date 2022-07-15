const mongoose = require('mongoose');


const drugSchema = new mongoose.Schema({
    store_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    prize: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dosage: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: false
    },
    dosage_form: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        required: false
    },
    discount: {
        type: Number,
        required: false
    },
    nhis: {
        type: Number,
        required: false
    },
    images: [String]
}, { timestamps: true });

module.exports = mongoose.model('Drug', drugSchema);
