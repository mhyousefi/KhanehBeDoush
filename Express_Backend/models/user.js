'use strict'

const Sequelize = require('sequelize')
const sequelizeDb = require('./index').sequelizeDb

module.exports = sequelizeDb.define('user', {
  id: {
    primaryKey: true,
    type: Sequelize.STRING
  },
  name: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  credit: Sequelize.FLOAT,
  userType: Sequelize.STRING
})