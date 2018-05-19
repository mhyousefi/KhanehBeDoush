import sequalize from 'sequalize'

const House = sequalize('house', {
  id: sequalize.STRING,
  dealType: sequalize.STRING,
  area: sequalize.INTEGER,
  buildingType: sequalize.STRING,
  imageUrl: sequalize.STRING,
  isFromACMServer: sequalize.BOOLEAN,
  basePrice: sequalize.INTEGER,
  rentPrice: sequalize.INTEGER,
  sellingPrice: sequalize.INTEGER,
  expireTime: sequalize.DATE,
})


export const addHouse = (newHouse) => {
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

export const getHouseById = (id) => {
  return House.findById(id).then(house => {
    if (!house) throw new Error('House not found.')
    return house
  })
}