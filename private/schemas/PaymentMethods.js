const mongoose = require("mongoose")

const paymentMethodsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    payment_type: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("PaymentMethods", paymentMethodsSchema);
