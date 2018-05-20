const op = require('sequelize').Op
const sequelizeDb = require('../models/index')
const apiUtils = require('./apiUtils')
const fetch = require('fetch')
const addHomeToDb = require('../domain/homeRepo').addHome

const ACM_GET_HOMES_URL = '139.59.151.5:6664/khaneBeDoosh/v2/house'

const createSearchCriterion = (minArea, maxPrice, dealType, buildingType) => {
  let res = {}
  if (maxPrice) {
    res = {
      [op.or]: [
        {
          [op.and]: [
            {
              dealType: 'sale'
            },
            {
              sellingPrice: { [op.lte]: maxPrice }
            }
          ]
        },
        {
          [op.and]: [
            {
              dealType: 'rent'
            },
            {
              rentPrice: { [op.lte]: maxPrice }
            }
          ]
        }
      ]
    }
  }

  if (minArea) {
    res.area = {[op.gte]: minArea}
  }

  if (dealType) {
    res.dealType = dealType
  }

  if (buildingType) {
    res.buildingType = buildingType
  }

  return res
}

const getHomesFromACMServer = () => {
  return fetch(ACM_GET_HOMES_URL)
    .then((data) => {
      return data
    }).catch(function (error) {
      throw new Error(error.message)
    })
}

const addPriceInfo = (home, entry) => {
  if (entry.dealType === 1) {
    home.sellingPrice = 0
    home.rentPrice = entry.rentPrice
    home.basePrice = entry.basePrice
  } else {
    home.rentPrice = 0
    home.basePrice = 0
    home.sellingPrice = entry.sellingPrice
  }
}

const addHomesFromAcm = async () => {
  getHomesFromACMServer().then((acmData) => {
    console.log(`RESULTS ====> ${acmData}`)
    if (acmData.result === 'ok' && acmData.expireTime && acmData.data) {
      acmData.data.forEach(entry => {
        const home = {
          id: entry.id,
          dealType: entry.dealType === 1 ? 'rent' : 'sale',
          area: entry.area,
          address: entry.address,
          buildingType: entry.buildingType,
          imageUrl: entry.imageUrl,
          isFromACMServer: entry.isFromACMServer,
          expireTime: acmData.expireTime
        }
        addPriceInfo(home, entry)
        addHomeToDb(home)
      })
    }
  })
}

const createDatabaseTables = async () => {
  await sequelizeDb.sync().then(() => {
    console.log('Database tables are created successfully.')
  })
  await addHomesFromAcm()
}

module.exports.createSearchCriterion = createSearchCriterion
module.exports.createDatabaseTables = createDatabaseTables