const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
})

module.exports = model('User', userSchema)
