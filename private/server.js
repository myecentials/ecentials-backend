const express = require('express')

const app = express();
const keys = require('./../keys.json')

app.set('keys', keys.ecentials)

//import route
const authRoute = require('../routes/auth')

//connect to database
const mongoose = require('./database/mongodb.js')(app.get('keys').db_name)

//send post requests
app.use(express.json())

//Route middleware
app.use('/api/user', authRoute)

app.listen(app.get('keys').port, () => console.log('Server running on port 3001'))