'use strict'

let Sequelize = require('sequelize')
let env       = process.env.NODE_ENV || 'development'
let config    = require(__dirname + '/../config/dbConfig.json')[env]

const sequelizeDb = new Sequelize(config.database, config.username, config.password, config);

const createTables = () => {
  sequelizeDb.sync().then(() => {
    console.log('Database tables are created successfully.')
  })
}


module.exports.sequelizeDb = sequelizeDb
module.exports.createTables = createTables
