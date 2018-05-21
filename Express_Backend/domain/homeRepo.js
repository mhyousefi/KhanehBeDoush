'use strict'

const Home = require('../models/home')
const dbUtils = require('../utilities/dbUtils')

const addHome = async (newHome, errCallback) => {
  try {
    await Home.create({
      id: newHome.id,
      dealType: newHome.dealType,
      area: newHome.area,
      address: newHome.address,
      buildingType: newHome.buildingType,
      imageUrl: newHome.imageUrl,
      isFromACMServer: newHome.isFromACMServer,
      basePrice: newHome.basePrice,
      rentPrice: newHome.rentPrice,
      sellingPrice: newHome.sellingPrice,
      expireTime: newHome.expireTime,
    }).then(home => {
      if (!home) errCallback(new Error('Could not add home'))
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

const searchHomes = async (searchParams, errCallback) => {
  try {
    const searchCriterion = dbUtils.createSearchCriterion(
      searchParams.minArea,
      searchParams.maxPrice,
      searchParams.dealType,
      searchParams.buildingType
    )
    return await Home.findAndCountAll({
      where: searchCriterion
    }).then(results => {
      if (!results) errCallback(new Error('Unable to search for homes'))
      else return results.rows
    })
  } catch (err) {
    errCallback(new Error(err.message))
  }
}

const getHomeCount = async (errCallback) => {
  const searchCriterion = {}
  try {
    return await Home.findAndCountAll({where: searchCriterion}).then(results => {
      if (!results) errCallback(new Error('Unable to search for homes'))
      else return results.count
    })
  } catch (err) {
    errCallback(new Error(err.message))
  }
}


module.exports.addHome = addHome
module.exports.getHomeById = getHomeById
module.exports.searchHomes = searchHomes
module.exports.getHomeCount = getHomeCount
