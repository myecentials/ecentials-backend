const mongoose = require("mongoose");

const healthInfoSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    health_pin: {
        type: Number,
        required: true
    },
    blood_group: {
        type: String, 
        required: true,
    },
    genotype: {
        type: String, 
        required: true,
    },
    allergies: {
        type: [String], 
        required: false,
    },
    medical_id_no: {
        type: String, 
        required: true,
    },
    pulse_rate: {
        type: Number,
        required: true
    },
    respiration_rate: {
        type: Number,
        required: true
    },
    blood_pressure: {
        type: Number,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    nhis_number: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model("HealthInformation", healthInfoSchema);
