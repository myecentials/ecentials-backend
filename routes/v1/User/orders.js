const router = require('express').Router();

const Orders = require('../../../private/schemas/Orders');
const verify = require('../../../verifyToken')


// list all orders for a verified user
router.get('', verify, async (req, res) => {
    const user_id = req.user._id;

    await Orders.find({}, {
        user_id
    }, (err, result) => {
        if (err) {
            return res.status(400).json({message: "Failed to load orders."})
        }
        return res.status(200).json({message: 'success', data: result});
    }).clone();
});


module.exports = router;
