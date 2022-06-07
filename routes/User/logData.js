const router = require('express').Router()
var mongoose = require('mongoose')
const verify = require('../../verifyToken') //checks if the user has a jwt token

var Notification = require('../../private/schemas/Notification')
var AccessAttempts = require('../../private/schemas/AccessAttempts')

//add notifications
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

//fetch undelivered notifications
router.post('/fetch-notification', verify, async (req, res) => {
    var user_id = req.user._id

    try{
        const notifications = await Notification.find({user_id: user_id, status: 0})

        if(notifications) return res.json({status: 200, message: notifications})
    }
    catch(e){
        res.json({status: 400, message: e})
    }
})

//mark notification as delivered
router.post('/mark-notification-as-delivered', verify, async (req, res) => {
    var user_id = req.user._id
    var notification_id = req.body.id

    try{
        const marked = await Notification.updateOne({_id: notification_id}, {$inc:{status: 1}})
        if(marked) return res.json({status: 200, message: "Delivered"})
    }
    catch(e){
        res.json({status: 400, message: e})
    }
})


//save login details
router.post('/login-attempts', verify, async (req, res) => {
    var user_id = req.user._id

    const attempts = new AccessAttempts({
        user_id: user_id,
        device_type: req.body.device_type,
        device_name: req.body.device_name, 
        ip_addr: req.body.ip_addr, 
        type: req.body.type //0-logout, 1-login
    })
    try{
        const access_attempts = await attempts.save()
        if(access_attempts) return res.json({status: 200, message: "Saved"})
    }
    catch(e){
        res.json({status: 400, message: e.message})
    }
})


module.exports = router