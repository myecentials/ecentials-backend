const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Hospital", hospitalSchema);
