'use strict'

const Sequelize = require('sequelize')
const sequelizeDb = require('./index').sequelizeDb

module.exports = sequelizeDb.define('paymentHistory', {
  userId: Sequelize.STRING,
  phoneNumber: Sequelize.STRING,
})