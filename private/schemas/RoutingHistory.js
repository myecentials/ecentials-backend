const mongoose = require("mongoose");

const routingHistorySchema = new mongoose.Schema({
    agent_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    routing_type: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    origin_lat: {
        type: Number,
        required: true
    },
    origin_lng: {
        type: Number,
        required: true
    },
    destination_lat: {
        type: Number,
        required: true
    },
    destination_lng: {
        type: Number,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("RoutingHistory", routingHistorySchema);
