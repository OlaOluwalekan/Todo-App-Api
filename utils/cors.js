const allowedOrigins = [
  'https://app-makelist.netlify.app',
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'http://localhost:5173/',
]

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200,
}

const credentials = (req, res, next) => {
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', true)
  }
  next()
}

module.exports = { corsOptions, credentials }
