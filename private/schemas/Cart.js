const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user_id : {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    item_name: {
        type: String,
        required: true
    },
    item_image_url: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
