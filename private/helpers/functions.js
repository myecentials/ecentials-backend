const bcrypt = require('bcryptjs/dist/bcrypt') //encrypting the password

const encryptPassword = password => {
    //encrypt password
    const saltRounds = 10;
    const hashPassword = bcrypt.hashSync(password, saltRounds)
    return hashPassword
}

module.exports.encryptPassword = encryptPassword
