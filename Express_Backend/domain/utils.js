const op = require('sequelize').Op

const logError = (err) => {
  if (err) {
    console.log(`The following error occurred while attempting database query: ${err.message}`)
  }
}

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

module.exports.logError = logError
module.exports.createSearchCriterion = createSearchCriterion