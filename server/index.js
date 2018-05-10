require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const logger = require('./etc/logger')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

require('./routes')(app)

const port = process.env.PORT || 3001
app.listen(port, () => {
  logger.info(`Listening on port ${port}`)
})
