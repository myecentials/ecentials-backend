const jwt = require('jsonwebtoken')

//checks if the request has a header of auth-token which is the token of the logged in user
module.exports = function (req, res, next){
    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Access Denied')

    try{
        const verified = jwt.verify(token, process.env.SECRET)
        req.user = verified
        next()
    }
    catch(err){
        return res.status(400).send('Invalid Token')
    }
}