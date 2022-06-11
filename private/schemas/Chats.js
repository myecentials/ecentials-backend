const mongoose = require("mongoose");

const chatsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    recipient_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

module.exports = mongoose.model("Chats", chatsSchema);
