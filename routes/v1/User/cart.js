const router = require('express').Router();

const Cart = require('../../../private/schemas/Cart');
const verify = require('../../../verifyToken')


// allows a verified user to add an item to cart
router.post('/add-item', verify, async (req, res) => {
    user_id = req.user._id;

    const { item_name, item_image_url, quantity, price } = req.body;

    if (!!item_name && !!quantity && !!price) {
        await Cart.create({
            user_id, item_name, item_image_url, quantity, price
        }, (err, result) => {
            if (err) {
                return res.status(400).json({message: 'Failed to add item to cart'});
            }
            return res.status(200).json({message: 'success', data: result});
        });
    } else {
        return res.status(400).json({message: 'Please provide the needed data'});
    }
});


// endpoint for authorized user to remove an item from cart
router.delete('/remove-item-from-cart', verify, async (req, res) => {
    user_id = req.user._id;
    const { item_id } = req.body;

    await Cart.deleteOne(
        { user_id, _id: item_id },
        (err, _) => {
            if (err) return res.status(400).json({message: 'Failed to remove favourite'});

            return res.status(200).json({message: 'Favourite removed successfully'})
        }

    ).clone();
});


module.exports = router;