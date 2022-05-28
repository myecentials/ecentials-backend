
const mongoose = require('mongoose')

const educationalInfoSchema = new mongoose.Schema({
    school_name: {
        type: String, 
        required: false
    }, 
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: false
    },
    course: {
        type: String, 
        required: false
    },  
    duration: {
        type: String, 
        required: false
    },  
    highest_level: {
        type: String, 
        required: false
    }, 
})

module.exports = mongoose.model("EducationalInfo", educationalInfoSchema)
