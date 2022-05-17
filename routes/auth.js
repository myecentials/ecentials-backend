const router = require('express').Router();

const User = require('../private/schemas/User');

router.get('/login', async (req, res) => {
    res.send("user")
})

module.exports = router