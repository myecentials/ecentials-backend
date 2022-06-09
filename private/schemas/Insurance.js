const mongoose = require("mongoose");

const insuranceSchema = new mongoose.Schema({
    insurance_type: {
        type: String,
        required: true
    },
    amount_absorbed: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Insurance", insuranceSchema);
