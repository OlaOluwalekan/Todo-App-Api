const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const connect = (uri) => {
  return mongoose.connect(uri, console.log('connected to mongoDB'))
}

module.exports = connect
