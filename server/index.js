require('dotenv').config()

const app = require('./app')
const logger = require('./etc/logger')

const port = process.env.PORT || 3001
app.listen(port, () => {
  logger.info(`Listening on port ${port}`)
})
