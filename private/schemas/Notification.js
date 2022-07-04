const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    status: {
        type: Number, 
        required: false, 
        default: 0
    },
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    image: {
        type: String, 
        required: true
    }, 
    title: {
        type: String, 
        required: false
    }, 
    message: {
        type: String, 
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    },
    notification_type: {
        type: String,
        required: true,
        default: 'user_specific'
    }
}, { timestamps: true })

module.exports = mongoose.model("Notification", notificationSchema)
