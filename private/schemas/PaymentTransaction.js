const mongoose = require("mongoose");

const paymentTransactionSchema = new mongoose.Schema({
    status: {
        type: Number,
        required: true
    },
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    currency: {
        type: String,
        required: false
    },
    amount_paid: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    item_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    facility_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    payment_method: {
        type: String,
        required: true
    },
    transaction_code: {
        type: Number,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("PaymentTransaction", paymentTransactionSchema);
