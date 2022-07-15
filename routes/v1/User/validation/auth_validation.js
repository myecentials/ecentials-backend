//VALIDATION
const Joi = require('joi')
const passwordComplexity = require("joi-password-complexity")

// const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
// const stringPassswordError = new Error("Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length")

const complexityOptions = {
    min: 6, 
    max: 1025, 
    lowerCase: 1, 
    upperCase: 1, 
    numeric: 1, 
    symbol: 1, 
    requirementCount: 4
}

//register validation
const registerValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email().required(),
        password: passwordComplexity(complexityOptions).required()
        })
    return schema.validate(data)
}

//login validation
// const loginValidation = data => {
//     const schema = {
//         email: Joi.string().min(6).required().email(),
//         password: Joi.string().min(6).required()
//     }
//     return Joi.validate(data, schema)
// }


//forgot-password email validation
const emailValidation = data => {
    const emailschema = Joi.object({
        email: Joi.string().min(6).required().email().required(),
    })
    return emailschema.validate(data)
}

//reset password validation 
const passwordValidation = data => {
    const passwordschema = Joi.object({
        // email: Joi.string().min(6).required().email().required(),
        password: passwordComplexity(complexityOptions).required(),
        confirmPassword: passwordComplexity(complexityOptions).required(),
    })
    return passwordschema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.emailValidation = emailValidation
module.exports.passwordValidation = passwordValidation