const mongoose = require('mongoose')

const attemptsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    device_type: {
        type: String, 
        required: true
    }, 
    device_name: {
        type: String, 
        required: false
    }, 
    type: {
        type: Number, 
        required: true
    },
    ip_addr: {
        type: String, 
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    }
})

module.exports = mongoose.model("AccessAttempts", attemptsSchema)
