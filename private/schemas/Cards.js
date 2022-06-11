const mongoose = require("mongoose")

const paymentMethodsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    card_holder_name: {
        type: String,
        required: true
    },
    card_no: {
        type: String,
        required: true
    },
    cvc: {
        type: Number,
        required: true
    },
    expires_date: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Cards", paymentMethodsSchema);
