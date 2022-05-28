const router = require('express').Router()
var mongoose = require('mongoose')
const bcrypt = require('bcryptjs/dist/bcrypt') //encrypting the password
const verify = require('../../verifyToken') //checks if the user has a jwt token
const User = require('../../private/schemas/User')
const EducationalInfo = require('../../private/schemas/EducationalInfo')

const {
    encryptPassword
} = require('../../private/helpers/functions')

//this verifies using the token before any transaction is made. 
//fetch personal details
router.post('/fetch-personal-details', verify, async (req, res) => {
    var user_id = req.user._id
    const isUserPresent = await User.findOne({
        _id: user_id
    }, {
        personal: 1
    })
    if (!isUserPresent) return res.json({
        status: 400,
        message: "Something went wrong. Try again later"
    })
    return res.json({
        status: 200,
        message: isUserPresent
    })
})

//add personal details
router.post('/addEdit-personal-details', verify, async (req, res) => {
    var user_id = req.user._id
    var changes = {
        "personal.name": req.body.name,
        "personal.phone": req.body.phone,
        "personal.gender": req.body.gender,
        "personal.address": req.body.address,
        "personal.occupation": req.body.occupation,
        "personal.dob": req.body.dob,
        "personal.ghana_card_no": req.body.ghana_card_no,
        "personal.height": req.body.height,
        "personal.weight": req.body.weight,
    }

    const add_details = await User.updateOne({
        _id: user_id
    }, {
        $set: changes
    })
    if (!add_details) return res.json({
        status: 400,
        message: "Something went wrong"
    })
    return res.json({
        status: 200,
        message: "Personal information added successfully",
        data: changes
    })
})

//fetch health details
router.post('/fetch-health-details', verify, async (req, res) => {
    var user_id = req.user._id
    const isUserPresent = await User.findOne({
        _id: user_id
    }, {
        health: 1
    })
    if (!isUserPresent) return res.json({
        status: 400,
        message: "No such record"
    })
    return res.json({
        status: 200,
        message: isUserPresent
    })
})

//it seems the code for adding can also be used for editing
//add or edit health details
router.post('/addEdit-health-details', verify, async (req, res) => {
    var user_id = req.user._id
    var changes = {
        "health.blood_group": req.body.blood_group,
        "health.genotype": req.body.genotype,
        "health.alergies": req.body.alergies,
        "health.medical_id_no": req.body.medical_id_no,
        "health.pulse_rate": req.body.pulse_rate,
        "health.respiration_rate": req.body.respiration_rate,
        "health.blood_pressure": req.body.blood_pressure,
        "health.temperature": req.body.temperature,
        "health.nhis_no": req.body.nhis_no
    }

    const add_details = await User.updateOne({
        _id: user_id
    }, {
        $set: changes
    })
    if (!add_details) return res.json({
        status: 400,
        message: "Something went wrong"
    })
    return res.json({
        status: 200,
        message: "Health information added successfully"
    })
})

//add school details
router.post('/add-school-details', verify, async (req, res) => {
    var user_id = req.user._id
    var schoolname = req.body.school_name

    const educationalInfo = new EducationalInfo({
        school_name: schoolname,
        user_id: user_id,
        course: req.body.course,
        duration: req.body.duration,
        highest_level: req.body.highest_level
    })

    try {
        const checkIfExists = await EducationalInfo.findOne({
            school_name: schoolname,
            user_id: user_id
        })
        if (checkIfExists != null) return res.json({
            status: 400,
            message: "Record already exists"
        })

        const saveEducation = await educationalInfo.save()
        if (saveEducation) return res.json({
            status: 200,
            message: "Educational Info added successfully",
            user: user_id
        })
    } catch (err) {
        return res.json({
            status: 400,
            message: err
        })

    }
})

//edit school details
router.post('/edit-school-details', verify, async (req, res) => {
    var user_id = req.user._id
    var record_id = req.body.record_id
    var schoolname = req.body.school_name

    const educationalInfo = {
        school_name: schoolname,
        user_id: user_id,
        course: req.body.course,
        duration: req.body.duration,
        highest_level: req.body.highest_level
    }

    try {
        const updateRecord = await EducationalInfo.updateOne({
            _id: record_id
        }, {
            $set: educationalInfo
        })
        if (updateRecord) return res.json({
            status: 200,
            message: "Educational Info updated successfully"
        })
    } catch (err) {
        return res.json({
            status: 400,
            message: err
        })
    }
})

//fetch school details
router.post('/fetch-school-details', verify, async (req, res) => {
    var user_id = req.user._id
    const school_details = await EducationalInfo.find({
        user_id: user_id
    })

    if (!school_details) return res.json({
        status: 400,
        message: "You have no school details"
    })

    return res.json({
        status: 200,
        message: school_details
    })

})

//delete a school detail
router.post('/delete-school-details', verify, async (req, res) => {
    var user_id = req.user._id
    var record_id = req.body.record_id

    try {
        const removeRecord = await EducationalInfo.findOneAndRemove({
            _id: record_id
        })
        if (!removeRecord) return res.json({
            status: 400,
            message: "Something went wrong. Try again later"
        })
        return res.json({
            status: 200,
            message: "Educational Info removed successfully"
        })
    } catch (err) {
        return res.json({
            status: 400,
            message: err
        })
    }
})

//verify if a health pin has been created.
//if not create it. Other wise compare them to see if it matches. 
router.post('/health-pin', verify, async (req, res) => {
    var user_id = req.user._id
    var pin = req.body.pin

    try {
        const checkIfExists = await User.findOne({
            _id: user_id
        }, {
            "health.pin": encryptPassword(pin)
        })
        console.log(checkIfExists)
        if (checkIfExists == null) {
            await User.updateOne({
                _id: user_id
            }, {
                $set: {
                    "health.pin": encryptPassword(pin)
                }
            })
            return res.json({
                status: 200,
                message: "Pin has been set. It would be required anytime you wish to access your health information"
            })
        }
        //compare them
        const validPin = await bcrypt.compareSync(pin, checkIfExists.health.pin)
        if (!validPin) return res.json({
            status: 400,
            message: "Invalid pin"
        })
        return res.json({
            status: 200,
            message: "Welcome"
        })
    } catch (err) {
        return res.json({
            status: 400,
            message: err
        })
    }
})


module.exports = router