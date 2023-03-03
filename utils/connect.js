const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

const connect = () => {
  mongoose.connect(process.env.MONGO_URI, console.log('connected to mongoDB'))
}

module.exports = connect
