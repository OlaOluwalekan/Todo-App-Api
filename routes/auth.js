const express = require('express')
const { registerUser, loginUser, logOutUser } = require('../controllers/auth')
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logOutUser)

module.exports = router
