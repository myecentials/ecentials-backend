const mongoose = require("mongoose");

const ratingsSchema = new mongoose.Schema({
    reviewer_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    recipient_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    recipient_type: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Ratings", ratingsSchema);
