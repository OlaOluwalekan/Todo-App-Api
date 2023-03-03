const User = require('../models/User')
const createError = require('../utils/error')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email })
    if (user.length > 0) {
      return res
        .status(401)
        .json({ status: 'failure', message: `this email already exist` })
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    await newUser.save()
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_TOKEN)
    res.cookie('access_token', token, { httpOnly: true })
    res
      .status(201)
      .json({ staus: 'success', message: 'registration successful', newUser })
  } catch (error) {
    next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return next(
        createError(404, `Email ${req.body.email} not found. register instead`)
      )
    }
    if (user.password !== req.body.password) {
      return next(createError(400, `incorrect password`))
    }
    const { password, ...rest } = user._doc
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN)
    res
      .cookie('access_token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      })
      .status(200)
      .json({
        staus: 'success',
        message: 'login successful',
        user: rest,
      })
  } catch (error) {
    next(error)
  }
}

const logOutUser = (req, res) => {
  res
    .cookie('access_token', 'token', {
      httpOnly: true,
      maxAge: 1000,
    })
    .status(200)
    .json({
      staus: 'success',
      message: 'logout successful',
    })
}

module.exports = { registerUser, loginUser, logOutUser }
