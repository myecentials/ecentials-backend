const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    store_pin: {
        type: String,
        required: true
    },
    name: {
        type: String, 
        required: true,
    },
    description: {
        type: String, 
        required: false,
    },
    address: {
        type: String, 
        required: true,
    },
    city: {
        type: String, 
        required: true,
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    licence_no: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    accept_nhis: {
        type: Boolean,
        required: false
    },
    gps_lat: {
        type: Number,
        required: false
    },
    gps_lng: {
        type: Number,
        required: false
    },
    date_added: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("Store", storeSchema);
