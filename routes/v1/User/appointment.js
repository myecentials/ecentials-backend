const router = require('express').Router();

const verify = require('../../../../verifyToken');
const Appointments = require('../../../private/schemas/Appointments');


router.get('', verify, async (req, res) => {
    const user_id = req.user._id;

    const { appoint_type, status } = req.body;

    Appointments.find({}, {
        user_id, appoint_type, status
    }, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Failed to load appointments' });
        }
        return res.status(200).send({ message: 'success', data: result });
    }).clone();
});

module.exports = router;
