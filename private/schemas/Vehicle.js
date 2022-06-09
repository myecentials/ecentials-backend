const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    driver_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    licence_no: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    insurance: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

module.exports = mongoose.model("Vehicle", vehicleSchema);
