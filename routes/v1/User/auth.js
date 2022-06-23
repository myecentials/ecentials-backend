const router = require('express').Router()
const dotenv = require('dotenv') //saves secrets like passwords, API keys etc in a virtual env
const User = require('../../../private/schemas/User')
const bcrypt = require('bcryptjs/dist/bcrypt') //encrypting the password
var mongoose = require('mongoose')

const jwt = require('jsonwebtoken') //for jwt webtoken to check if user is logged in 

//encrypt password 
const {encryptPassword} = require('../../../private/helpers/functions')

//validations are added to this file using the holi/joi library
const {registerValidation, emailValidation, passwordValidation} = require('./validation/auth_validation')

dotenv.config()

//REGISTRATION
router.post('/register', async (req, res) => {
    var email = req.body.email
    var password = req.body.password

    //simple validation of the email and password
    const {error} = registerValidation(req.body)
    if(error) return res.json({status: 400, message:error.details[0].message})

    //check if user exists
    const emailExists = await User.findOne({email: email})
    if(emailExists) return res.json({status: 400, message:"User already exists"})

    //create new user
    const user = new User({
        email: email,
        password: encryptPassword(password),
    })
    try{
        const saveUser = await user.save()
        if(saveUser) return res.json({status: 200, message:"User created successfully"})
    }catch(err){
        return res.json({status: 400, message:err})
    }
})


//LOGIN
router.post('/login', async (req, res) => {
    var email = req.body.email
    var password = req.body.password

    //simple validation of the email and password
    const {error} = registerValidation(req.body)
    if(error) return res.json({status: 400, message:error.details[0].message})

    //check if email exists & comparing passwords
    const user = await User.findOne({email: email})

    const validPass = await bcrypt.compareSync(password, user.password)

    if(!user || !validPass) return res.json({status: 400, message: "Invalid credentials"})

    //create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.SECRET)
    res.header('auth-token', token).send(token)
})

//FORGOT PASSWORD
router.post('/forgot-password', async (req, res) => {
    var email = req.body.email

    //simple validation of the email and password
    const {error} = emailValidation(req.body)
    if(error) return res.json({status: 400, message:error.details[0].message})
    const isEmailAvailable = await User.findOne({email: email})
    if(!isEmailAvailable) return res.json({status: 400, message:"User does not exist. Please create an account instead"})
    return res.json({status: 200, message:"User exists"})
})

//RESET PASSWORD
router.post('/reset-password', async (req, res) => {
    var email = req.body.email
    var password = req.body.password
    var confirmPassword = req.body.confirmPassword

    if(password != confirmPassword) return res.json({status: 400, message: "Password mismatch"})

    const {error} = passwordValidation(req.body)
    if(error) return res.json({status: 400, message: error.details[0].message})

    //change the password 
    const updatePassword = await User.updateOne({email: email}, {$set:{password: encryptPassword(confirmPassword)}})
    if(updatePassword) return res.json({status: 200, message:"Password reset completed"})
})


module.exports = router