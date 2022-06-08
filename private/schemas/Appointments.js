const mongoose = require("mongoose");

const appointmentsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    staff_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    status: {
        type: Number,
        required: false
    },
}, { timestamps: true })

module.exports = mongoose.model("Appointments", appointmentsSchema);
