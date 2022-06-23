const router = require('express').Router();


router.use('/api/v1/user', require('./User/auth'))
router.use('/api/v1/user/account', require('./User/userAccount'))
router.use('/api/v1/user/logs', require('./User/logData'))
router.use('/api/v1/user/notifications', require('./User/Notifications/notification'))

module.exports = router
