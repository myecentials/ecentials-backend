const router = require('express').Router();

const verify = require('../../../../verifyToken');
const Notification = require('../../../../private/schemas/Notification');
const User = require('../../../../private/schemas/User');


// creates a new notification for a verified user
router.post('/add_notification_for_user', verify, async (req, res) => {
    const { user_id, title, message, image, notification_type } = req.body;

    const isUserPresent = await User.findOne({
        _id: user_id
    }, {
        personal: 1
    })
    if (!isUserPresent) return res.json({
        status: 400,
        message: "Something went wrong. Try again later"
    })

    if (!!title && !!message && !!image) {
        await Notification.create({
            title, message, image, user_id, notification_type
        }, ((err, result) => {
            if (err) {
                return res.status(400).json({ message: "Failed to save notification" })
            }
            return res.status(200).json({ message: "Notification saved successfully" })
        }))
    }
    else {
        return res.status(400).json({
            message: "Something went wrong. Try again later"
        })
    }
});


// retrieve all notifications for a verified user
router.get('/fetch-all-user-notifications', verify, async (req, res) => {
    const user_id = req.user._id

    try{
        const notifications = await Notification.find({ user_id: user_id })

        if(notifications) return res.status(200).json({ message: "success", data: notifications })
    }
    catch(e){
        res.status(400).json({ message: e })
    }
});

// this route allows a user to fetch a specific notification or recommended
// notification for the user
router.get('/fetch-user-notifications', verify, async (req, res) => {
    const user_id = req.user._id;
    const { notification_type } = req.body;

    try{
        const notifications = await Notification.find({ user_id, notification_type })

        if(notifications) return res.status(200).json({ message: "success", data: notifications })
        else return res.status(400).json({ message: 'Failed to retrieve notifications'})
    }
    catch(e){
        res.status(400).json({ message: e })
    }
})

module.exports = router;