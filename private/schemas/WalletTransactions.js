const mongoose = require("mongoose")

const walletTransactionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    transaction_type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("WalletTransaction", walletTransactionSchema);
