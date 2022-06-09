const mongoose = require("mongoose");

const favouritesSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    favourite_type: {
        type: String,
        required: true
    },
    item_id: {
        type: Number,
        required: true
    },
    date_favoured: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("Favourites", favouritesSchema);
