'use strict'

const House = require('../models/house')

console.log(House)

const addHome = async (newHouse) => {
  return House.create({
    id: newHouse['id'],
    dealType: newHouse['dealType'],
    area: newHouse['area'],
    buildingType: newHouse['buildingType'],
    imageUrl: newHouse['imageUrl'],
    isFromACMServer: newHouse['isFromACMServer'],
    basePrice: newHouse['basePrice'],
    rentPrice: newHouse['rentPrice'],
    sellingPrice: newHouse['sellingPrice'],
    expireTime: newHouse['expireTime'],
  }).then(house => {
    if (!house) throw new Error('Unable to add house to the database.')
    console.log(`The following house was successfully added ==> ${house}`)
  })
}

const getHomeById = async (id) => {
  return House.findById(id).then(house => {
    if (!house) throw new Error('House not found')
    return house
  })
}

module.exports.addHome = addHome
module.exports.getHomeById = getHomeById
