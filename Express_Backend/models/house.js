'use strict'

const Sequelize = require('sequelize')
const sequelizeDb = require('./index').sequelizeDb

module.exports = sequelizeDb.define('house', {
  id: {
    primaryKey: true,
    type: Sequelize.STRING
  },
  dealType: Sequelize.STRING,
  area: Sequelize.INTEGER,
  buildingType: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
  isFromACMServer: Sequelize.BOOLEAN,
  basePrice: Sequelize.INTEGER,
  rentPrice: Sequelize.INTEGER,
  sellingPrice: Sequelize.INTEGER,
  expireTime: Sequelize.DATE,
})