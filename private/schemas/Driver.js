const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
    driver_type: {
        type: String,
        required: true
    },
    work_ready: {
        type: Number,
        required: true
    },
    facility_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    facility_type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    licence_no: {
        type: String,
        required: true
    },
    proof_of_address: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    },
    vehicle_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Driver", driverSchema);
