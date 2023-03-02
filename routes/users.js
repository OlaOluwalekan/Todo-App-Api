const express = require('express')
const { getAllUsers, getUser, deleteUser } = require('../controllers/users')
const { verifyUser, verifyToken } = require('../utils/verify')
const router = express.Router()

router.get('/', getAllUsers)
router.get('/dashboard/:id', verifyUser, getUser)
router.delete('/:id', verifyUser, deleteUser)
router.get('/test', verifyToken, (req, res, next) => {
  res.send('hello user, you are logged in')
})
router.get('/check/:id', verifyUser, (req, res, next) => {
  res.send('whats up user')
})

module.exports = router
