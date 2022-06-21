const router = require('express').Router();

const verify = require('../../../../verifyToken');
const Notification = require('../../../../private/schemas/Notification');
const User = require('../../../../private/schemas/User');


// creates a new notification for a verified user
router.post('/add_notification_for_user', verify, async (req, res) => {
    const user_id = req.user._id;
    const { title, message, image } = req.body;

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
            title, message, image, user_id
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

module.exports = router;