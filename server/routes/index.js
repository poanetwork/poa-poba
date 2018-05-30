const fs = require('fs')
const path = require('path')

const basename = path.basename(module.filename)
const logger = require('../etc/logger')

const getRoutes = app => {
  fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .map(file => file.replace('.js', ''))
    .forEach(file => {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const route = require(`./${file}`)
      app.use(`/api/${file}`, route)
      logger.info(`registering route /api/${file}`)
    })
}

module.exports = getRoutes
