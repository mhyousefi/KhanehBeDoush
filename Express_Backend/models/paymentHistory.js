'use strict'

const Sequelize = require('sequelize')
const sequelizeDb = require('./index')

module.exports = sequelizeDb.define('paymentHistory', {
  userId: Sequelize.STRING,
  phoneNumber: Sequelize.STRING,
})