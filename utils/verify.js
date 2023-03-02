const jwt = require('jsonwebtoken')
const createError = require('./error')

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) {
    // res.status(401).json({ auth: false })
    return next(createError(401, 'You are not authenticated'))
  }

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) return next(createError(403, 'Token is not valid'))
    req.user = user
    // console.log(user)
    next()
  })
}

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    // console.log(req.user.id)
    // console.log(req.params.id)
    if (req.user.id === req.params.id) {
      next()
    } else {
      return next(createError(403, 'You are not authorized'))
    }
  })
}

module.exports = { verifyUser, verifyToken }
