const router = require('express').Router();

// user related endpoints
router.use('/api/v1/user', require('./User/auth'))
router.use('/api/v1/user/account', require('./User/userAccount'))
router.use('/api/v1/user/logs', require('./User/logData'))
router.use('/api/v1/user/notifications', require('./User/Notifications/notification'))
router.use('/api/v1/user/favourites', require('./User/favourites'))
router.use('/api/v1/user/orders', require('./User/orders'))
router.use('/api/v1/user/cart', require('./User/cart'))

// pharmacy related details endpoints
router.use('/api/v1/pharmacies', require('./Pharmacy/pharmacy'))

// pescription related endpoints
router.use('/api/v1/prescription', require('./Prescription/prescription'))

module.exports = router
