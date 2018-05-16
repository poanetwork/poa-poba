const pino = require('pino')

const logger = pino({
  enabled: process.env.NODE_ENV !== 'test'
})

module.exports = logger
