const router = require('express').Router()
var mongoose = require('mongoose')
const verify = require('../verifyToken') //checks if the user has a jwt token

var Notification = require('../private/schemas/Notification')

router.post('/add-notification', verify, async (req, res) => {
    var user_id = req.user._id

    const details = new Notification({
        user_id: user_id, 
        image: req.body.img, 
        title: req.body.title, 
        message: req.body.message
    })
    try{
        const save = details.save()
        if(save) return res.json({status: 200, message: "Notification saved"})
    }
    catch(e){
        res.json({status: 400, message: e})
    }
})


module.exports = router