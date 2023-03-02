const User = require('../models/User')

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    res.status(200).json({ status: 'success', count: users.length, users })
  } catch (error) {
    next(error)
  }
}

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res
      .status(200)
      .json({ status: 'success', message: 'your account has been deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllUsers, getUser, deleteUser }
