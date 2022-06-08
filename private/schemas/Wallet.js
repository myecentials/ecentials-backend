const mongoose = require("mongoose")

const walletSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    date_updated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Wallet", walletSchema);
