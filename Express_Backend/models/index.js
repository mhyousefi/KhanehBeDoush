'use strict'

let Sequelize = require('sequelize')
let env       = process.env.NODE_ENV || 'development'
let config    = require(__dirname + '/../config/dbConfig.json')[env]

const sequelizeDb = new Sequelize(config.database, config.username, config.password, config);

module.exports.sequelizeDb = sequelizeDb
