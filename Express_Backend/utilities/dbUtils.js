const op = require('sequelize').Op
const sequelizeDb = require('../models/index')
const apiUtils = require('./apiUtils')
const request = require('request')
const addHomeToDb = require('../domain/homeRepo').addHome
const addUser = require('../domain/userRepo').addUser
const logError = require('./errorHandlingUtils').logError

const ACM_GET_HOMES_URL = 'http://139.59.151.5:6664/khaneBeDoosh/v2/house'
const theOnlyUser = {
  id: '1',
  name: 'بهنام همایون',
  username: 'beh1368',
  password: 's3cret',
  isAdmin: true,
  credit: 0,
}

const createSearchCriterion = (minArea, maxPrice, dealType, buildingType) => {
  let res = {}
  if (maxPrice) {
    res = {
      [op.or]: [
        {
          [op.and]: [
            {
              dealType: 'sale',
            },
            {
              sellingPrice: {[op.lte]: maxPrice},
            },
          ],
        },
        {
          [op.and]: [
            {
              dealType: 'rent',
            },
            {
              rentPrice: {[op.lte]: maxPrice},
            },
          ],
        },
      ],
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

const addPriceInfo = (home, entry) => {
  if (entry.dealType === 1) {
    home.sellingPrice = 0
    home.rentPrice = entry.price.rentPrice
    home.basePrice = entry.price.basePrice
  } else {
    home.rentPrice = 0
    home.basePrice = 0
    home.sellingPrice = entry.price.sellingPrice
  }
}

const addHomesFromAcm = async () => {
  try {
    await request(ACM_GET_HOMES_URL, async function (error, response, body) {
      const acmData = JSON.parse(body)
      console.log(acmData["expireTime"])
      if (acmData['result'] === 'OK' && acmData['expireTime'] && acmData['data']) {
        acmData.data.forEach(entry => {
          const home = {
            id: entry.id,
            dealType: entry.dealType === 1 ? 'rent' : 'sale',
            area: entry.area,
            address: entry.address,
            buildingType: entry.buildingType,
            imageUrl: entry.imageUrl,
            isFromACMServer: entry.isFromACMServer,
            expireTime: acmData.expireTime,
          }
          addPriceInfo(home, entry)
          console.log(`@@@## ===> ${JSON.stringify(home)}`)
          addHomeToDb(home, logError)
        })
      }

    })

  } catch (e) {
    throw new Error(e.message)
  }
}

const createDatabaseTables = async () => {
  await sequelizeDb.sync().then(() => {
    console.log('Database tables are created successfully.')
  })

  try {
    await addHomesFromAcm()
  } catch (e) {
    console.log(e.message)
  }

  await addUser(theOnlyUser, logError)
}

const getAcmHomeById = async (id, httpRes) => {
  request(`${ACM_GET_HOMES_URL}/${id}`, async function (error, response, body) {
    const acmData = JSON.parse(body)
    if (acmData['result'] === "OK") {
      console.log(`body ==> ${JSON.stringify(acmData['data'])}`)
      httpRes.send(JSON.stringify(acmData['data']))
    }
  })
}

module.exports.createSearchCriterion = createSearchCriterion
module.exports.createDatabaseTables = createDatabaseTables
module.exports.getAcmHomeById = getAcmHomeById