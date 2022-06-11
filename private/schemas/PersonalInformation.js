const mongoose = require("mongoose");

const personalInformationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    occupation: {
        type: String,
        required: false
    },
    ghana_card_number: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: false
    },
    weight: {
        type: Number,
        required: false
    },
    dob: {
        type: Number,
        required: true
    },
    gps_coordinates: {
        type: Map,
        of: Number
    }
}, { timestamps: true });

module.exports = mongoose.model("PersonalInformation", personalInformationSchema);
