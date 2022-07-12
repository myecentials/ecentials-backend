const router = require('express').Router();

const Drug = require('../../../private/schemas/Drug');
const verify = require('../../../verifyToken')


// allows a verified pharmacy to add a new drug to their 
// drugs catalog.
router.post('/add-new-drug', verify, async (req, res) => {
    const {
        store_id,
        name,
        prize,
        description,
        dosage,
        quantity,
        dosage_form,
        manufacturer,
        views,
        discount,
        nhis,
        images
    } = req.body;

    if (!!name && !!manufacturer && !!description) {
        Drug.create({
            store_id, name, prize, description, dosage, quantity, dosage_form, manufacturer, views,
            discount, nhis, images
        }, (err, result) => {
            if (err) {
                return res.status(400).json({ message: "Failed to add drug. Try again later." });
            }
            return res.status(200).json({ message: 'success', data: result })
        });
    } else {
        res.status(403).json({ message: 'Please make sure you have provided the needed details.'});
    }
});

// list all drugs associated to a particular pharmacy or shop
router.get('', verify, async (req, res) => {
    const { store_id } = req.body;

    await Drug.find({ store_id }, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Failed to retrieve drugs. Try again later.' });
        }
        return res.status(200).json({ message: "ok", data: result });
    }).clone();
});

module.exports = router;
