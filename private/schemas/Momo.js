const mongoose = require("mongoose")

const momoSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    momo_number: {
        type: String,
        required: true
    },
    network: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("Momo", momoSchema);
