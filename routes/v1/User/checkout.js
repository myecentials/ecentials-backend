const router = require('express').Router();


const Checkout = require('../../../private/schemas/Checkout');
const verify = require('../../../verifyToken')


// create a new checkout item for a user
router.post('/create-checkout-item', verify, async (req, res) => {
    const user_id = req.user._id;
    const {
        delivery_address,
        delivery_date,
        total_items_cost,
        shipping_fee,
        total,
        shipment_summary
    } = req.body;

    try {
        await Checkout.create({
            user_id, delivery_address, delivery_date, total_items_cost, shipping_fee, shipment_summary, total
        }, (err, result) => {
            if (err) {
                return res.status(400).json({ message: "Failed to create checkout item.", data: err });
            }
            return res.status(200).json({ message: "success", data: result });
        })
    } catch (error) {
        return res.status(400).json({ message: "Failed to create checkout item.", data: error });
    }
});

module.exports = router;
