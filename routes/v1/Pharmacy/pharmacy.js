const router = require('express').Router();

const Store = require('../../../private/schemas/Store');
const verify = require('../../../verifyToken')


// list all pharmacies
router.get('', verify, async (req, res) => {
    await Store.find({}, (err, result) => {
        if (err) {
            return res.status(400).json({message: 'Failed to retrieve pharmacies'});
        }
        res.status(200).json({message: 'success', data: result})
    }).clone();
});

module.exports = router;
    