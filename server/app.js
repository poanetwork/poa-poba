require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const logger = require('./etc/logger')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

require('./routes')(app)
//
// const logErrors = (err, req, res, next) => {
//   logger.error(err.stack)
//   next(err)
// }
// const clientErrorHandler = (err, req, res, next) => {
//   if (req.xhr) {
//     res.status(500).send({ error: 'Something failed!' })
//   } else {
//     next(err)
//   }
// }
// const errorHandler = (err, req, res) => {
//   res.status(err.status)
//   res.send('error', { error: err.message })
// }
// app.use(logErrors)
// app.use(clientErrorHandler)
// app.use(errorHandler)

module.exports = app
