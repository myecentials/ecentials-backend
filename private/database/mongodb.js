const mongoose = require('mongoose')

module.exports = (db_name) => {
    return mongoose.connect(`mongodb://127.0.0.1/${db_name}`, () => {
        console.log("MongoDB Connection Successful")
    }, e => console.error(e))
}