'use strict'

const Sequelize = require('sequelize')
const sequelizeDb = require('./index')

module.exports = sequelizeDb.define('homes', {
  id: {
    primaryKey: true,
    type: Sequelize.STRING
  },
  dealType: Sequelize.STRING,
  area: Sequelize.FLOAT,
  address: Sequelize.STRING,
  buildingType: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
  isFromACMServer: Sequelize.BOOLEAN,
  basePrice: Sequelize.FLOAT,
  rentPrice: Sequelize.FLOAT,
  sellingPrice: Sequelize.FLOAT,
  expireTime: Sequelize.DATE,
})