const mongoose = require("mongoose");

const facilitySchema = new mongoose.Schema({
    facility_type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    opening_hours: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    gps_address: {
        type: String,
        required: false
    },
    images: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Facility", facilitySchema);
