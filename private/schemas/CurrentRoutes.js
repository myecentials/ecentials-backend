const mongoose = require("mongoose");

const currentRoutesSchema = new mongoose.Schema({
    agent_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    current_location: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("CurrentRoutes", currentRoutesSchema);
