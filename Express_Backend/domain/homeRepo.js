'use strict'

const Home = require('../models/home')
const Sequelize = require('sequelize')
const createSearchCriterion = require('../utils/dbUtils').createSearchCriterion

const addHome = async (newHouse, errCallback) => {
  try {
    await Home.create({
      id: newHouse.id,
      dealType: newHouse.dealType,
      area: newHouse.area,
      address: newHouse.address,
      buildingType: newHouse.buildingType,
      imageUrl: newHouse.imageUrl,
      isFromACMServer: newHouse.isFromACMServer,
      basePrice: newHouse.basePrice,
      rentPrice: newHouse.rentPrice,
      sellingPrice: newHouse.sellingPrice,
      expireTime: newHouse.expireTime,
    }).then(home => {
      if (!home) errCallback(new Error('Could not add house'))
      else return home
    })
  } catch (err) {
    errCallback(new Error(err.message))
  }
}

const getHomeById = async (id, errCallback) => {
  try {
    return await Home.findById(id).then(home => {
      if (!home) errCallback(new Error('User was not found'))
      else return home
    })
  } catch (err) {
    errCallback(new Error(err.message))
  }
}

const searchHomes = async (minArea, maxPrice, dealType, buildingType, errCallback) => {
  const searchCriterion = createSearchCriterion(minArea, maxPrice, dealType, buildingType)
  try {
    return await Home.findAndCountAll({
      where: searchCriterion
    }).then(results => {
      if (!results) errCallback(new Error('Unable to search for houses'))
      else return results.rows
    })
  } catch (err) {
    errCallback(new Error(err.message))
  }
}


module.exports.addHome = addHome
module.exports.getHomeById = getHomeById
module.exports.searchHomes = searchHomes
