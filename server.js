const express = require('express')
const app = express()
const connect = require('./utils/connect')
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')
const todosRoutes = require('./routes/todos')
const { credentials, corsOptions } = require('./utils/cors')

app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(express.static('./public'))

// ROUTES MIDDLEWARES
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/todos', todosRoutes)

app.use((err, req, res, next) => {
  res
    .status(err.status)
    .json({ status: 'failure', message: err.message || 'something went wrong' })
})

app.get('/', (req, res) => {
  res.status(200).send(`<h1>Welcome Home</h1>`)
})

app.get('/cookies', (req, res) => {
  res.cookie('newUser', false)

  res.send('you got the cookies')
})

const port = process.env.PORT || 9000

const start = async () => {
  try {
    connect(process.env.MONGO_URI)
    app.listen(port, console.log(`server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
