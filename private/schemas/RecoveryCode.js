const mongoose = require('mongoose');

const recoveryCode = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    code: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("RecoveryCode", recoveryCode);
