const router = require('express').Router()
const User = require('../private/schemas/User')
//encrypt password 
const {encryptPassword} = require('../private/helpers/functions')

//validations are added to this file using the holi/joi library
const {registerValidation, emailValidation, passwordValidation} = require('./validation/auth_validation')

//REGISTRATION
router.post('/register', async (req, res) => {
    var email = req.body.email
    var password = req.body.password

    //simple validation of the email and password
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //check if user exists
    const emailExists = await User.findOne({email: email})
    if(emailExists) return res.status(400).send("User already exists")

    //create new user
    const user = new User({
        email: email,
        password: encryptPassword(password), //encrypt password
    })
    try{
        const saveUser = await user.save()
        if(saveUser) res.json({status: 200, message:"User created successfully", user: user._id
    })

    }catch(err){
        res.status(400).send(err.errors.name.message)
    }
})

//LOGIN
router.post('/login', async (req, res) => {

})

//FORGOT PASSWORD
router.post('/forgot-password', async (req, res) => {
    var email = req.body.email

    //simple validation of the email and password
    const {error} = emailValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const isEmailAvailable = await User.findOne({email: email})
    if(!isEmailAvailable) return res.status(400).send("User does not exist. Please create an account instead")

    return res.json({status: 200, message:"User exists"})
})

//RESET PASSWORD
router.post('/reset-password', async (req, res) => {
    var email = req.body.email
    var password = req.body.password
    var confirmPassword = req.body.confirmPassword

    if(password != confirmPassword) return res.status(400).send("Password mismatch")
    const {error} = passwordValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //change the password 
    const updatePassword = await User.updateOne({email: email}, {$set:{password: encryptPassword(confirmPassword)}})
    if(updatePassword) return res.json({status: 200, message:"Password reset completed"})
})


module.exports = router