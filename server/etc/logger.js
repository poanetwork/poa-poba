const pino = require('pino')

const logger = pino({
  enabled: !(process.env.NOLOG === 'true')
})

module.exports = logger
