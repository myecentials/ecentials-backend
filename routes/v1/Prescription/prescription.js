const router = require('express').Router();

const Prescription = require('../../../private/schemas/Prescription');
const verify = require('../../../verifyToken')


// upload a new prescription
router.post('/new-prescription', verify, async (req, res) => {
   const { user_id, status, image } = req.body;
   
   if (!!user_id && !!status ) {
    await Prescription.create({
        user_id, status, image
    }, (err, result) => {
        if (err) {
            return res.status(400).json({message: 'Failed to save prescription'})
        }
        return res.status(200).json({message: 'success', data: result});
    } );
   } else {
       return res.status(400).json({message: "Please provide the necessary data"});
   }
});


module.exports = router;