const express = require('express')

const app = express();
const keys = require('./../keys.json')

app.set('keys', keys.ecentials)

//import route
const authRoute = require('../routes/User/auth')
const userAccountRoute = require('../routes/User/userAccount')
const logRoute = require('../routes/User/logData')

//connect to database
const mongoose = require('./database/mongodb.js')(app.get('keys').db_name)

//send post requests
app.use(express.json())

//Route middleware
app.use('/api/user', authRoute)
app.use('/api/user/account', userAccountRoute)
app.use('/api/user/logs', logRoute)

app.listen(app.get('keys').port, () => console.log('Server running on port 3001'))