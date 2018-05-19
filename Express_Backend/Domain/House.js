class House {
  constructor (id, area, buildingType, imageUrl, isFromACMServer) {
    this.id = id
    this.area = area
    this.buildingType = buildingType
    this.imageUrl = imageUrl
    this.isFromACMServer = isFromACMServer
  }

  getId () {
    return this.id
  }

  getArea () {
      return this.area
  }

  getBuildingType () {
      return this.buildingType
  }

  getImageUrl () {
      return this.imageUrl
  }

  isFromAcmServer() {
    return this.isFromACMServer
  }
}

class RentalHouse extends House {
  constructor (id, area, buildingType, imageUrl, isFromACMServer, basePrice, rentPrice) {
    super(id, area, buildingType, imageUrl, isFromACMServer)
    this.basePrice = basePrice
    this.rentPrice = rentPrice
  }

  getBasePrice() {
    return this.basePrice
  }

  getRentPrice() {
    return this.rentPrice
  }
}

class SaleHouse extends House {
  constructor (id, area, buildingType, imageUrl, isFromACMServer, sellingPrice) {
    super(id, area, buildingType, imageUrl, isFromACMServer)
    this.sellingPrice = sellingPrice
  }

  getSellingPrice () {
    return this.sellingPrice
  }
}


module.exports.RentalHouse = RentalHouse
module.exports.SaleHouse = SaleHouse