const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    order_item_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    item_type: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("Orders", ordersSchema);
