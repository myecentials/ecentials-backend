const router = require('express').Router();


router.use('/api/v1/user', require('./User/auth'))
router.use('/api/v1/user/account', require('./User/userAccount'))
router.use('/api/v1/user/logs', require('./User/logData'))
router.use('/api/v1/user/notifications', require('./User/Notifications/notification'))
router.use('/api/v1/user/favourites', require('./User/favourites'))
router.use('/api/v1/user/orders', require('./User/orders'))
router.use('/api/v1/user/cart', require('./User/cart'))

module.exports = router
