const router = require('express').Router();

const Favourites = require('../../../private/schemas/Favourites');
const verify = require('../../../verifyToken')

// list all favourites for a verified user
router.get('', verify , async (req, res) => {
    user_id = req.user._id;

    await Favourites.find({}, {
        user_id
    }, (err, result) => {
        if (err) {
            return res.status(400).json({message: 'Failed to fetch user favourites'})
        }

        return res.status(200).json({message: "success", data: result});
    }).clone();
});


// endpoint for authorized user to add new favourite
router.post('/add-favourite', verify, async (req, res) => {
    user_id = req.user._id;
    
    const { favourite_type, item_id, date_favoured } = req.body;

    if (!!favourite_type && !!item_id) {
        await Favourites.create({
            user_id, favourite_type, item_id, date_favoured
        }, (err, result) => {
            if (err) {
                return res.status(400).json({message: 'Something went wrong'});
            }
            return res.status(200).json({message: 'success', data: result});
        })
    } else {
        return res.status(400).json({message: 'Please provide the needed details'});
    }
});

// endpoint for authorized user to remove a favourite
router.delete('/remove-favourite', verify, async (req, res) => {
    user_id = req.user._id;
    const { favourite_id } = req.body;

    await Favourites.deleteOne(
        { user_id, _id: favourite_id },
        (err, result) => {
            if (err) return res.status(400).json({message: 'Failed to remove favourite'});

            return res.status(200).json({message: 'Favourite removed successfully'})
        }

    ).clone();
});

module.exports = router;