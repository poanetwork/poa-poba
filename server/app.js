require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const logger = require('./etc/logger')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

require('./routes')(app)

// catch 404 and forward to error handler
app.use((req, res) => {
  return res.status(404).send({
    message: 'Not Found',
    error: {}
  })
})

app.use((err, req, res) => {
  const status = err.status || 500
  if (status >= 500) {
    logger.error(err.message)
    logger.error(err)
  } else {
    logger.warn(err.message)
    logger.warn(err)
  }
  return res.status(status).send({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    cat: `https://http.cat/${err.status || 500}`
  })
})

module.exports = app
