'use strict'

let Sequelize = require('sequelize')
let env       = process.env.NODE_ENV || 'development'
let config    = require(__dirname + '/../config/dbConfig.json')[env]

module.exports = new Sequelize(config.database, config.username, config.password, config);

