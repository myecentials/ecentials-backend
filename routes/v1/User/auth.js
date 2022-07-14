const router = require('express').Router()
const dotenv = require('dotenv') //saves secrets like passwords, API keys etc in a virtual env
const { v4: uuid } = require('uuid')

const User = require('../../../private/schemas/User')
const bcrypt = require('bcryptjs/dist/bcrypt') //encrypting the password
var mongoose = require('mongoose')

const jwt = require('jsonwebtoken') //for jwt webtoken to check if user is logged in 

//encrypt password 
const {encryptPassword} = require('../../../private/helpers/functions')

//validations are added to this file using the holi/joi library
const {registerValidation, emailValidation, passwordValidation} = require('./validation/auth_validation')

const verify = require('../../../verifyToken')
const sendMail = require('../../../private/services/send_email')
const RecoveryCode = require('../../../private/schemas/RecoveryCode')

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
    res.header('auth-token', token).json(
        {
            email,
            token,
            "id": user._id,
        }
    )
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
router.post('/reset-password', verify,  async (req, res) => {
    const user_id = req.user._id
    var email = req.body.email
    var password = req.body.password
    var confirmPassword = req.body.confirmPassword

    if(password != confirmPassword) return res.json({status: 400, message: "Password mismatch"})

    const {error} = passwordValidation(req.body)
    if(error) return res.json({status: 400, message: error.details[0].message})

    //change the password 
    const updatePassword = await User.updateOne({email: email, _id: user_id}, {$set:{password: encryptPassword(confirmPassword)}})
    if(updatePassword) return res.json({status: 200, message:"Password reset completed"})
})


// send email to user to start password reset process
router.post('/recover_password', verify, async (req, res) => {
    const user_id = req.user._id;
    const { email } = req.body;
    
    let code = `${uuid()}`.substring(0, 6).toUpperCase()

    if (email === '') {
        return res.status(400).json({ message: 'user email not provided.' });
    }

    sendMail(email, code).then(result => {
        // set the code sent to the user
        // this will be validated against to check if user has permission to change
        // password
        RecoveryCode.create({ user_id, code }, (err, _) => {
            if (err) {
                res.status(400).json({ message: 'Something went wrong. Try again later' });
            }
            res.status(200).json({ message: 'A verification has been sent to your email.'});
        });
    }).catch(err => {
        res.status(400).json({ message: "Could not send verification code. Try again later.",
    data: err })
    })
});
module.exports = router