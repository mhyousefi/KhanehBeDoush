const express = require('express')
const router = express.Router()
const homeRepo = require('../domain/homeRepo')
const validateHome = require('../utilities/errorHandlingUtils').validateHome
const logError = require('../utilities/errorHandlingUtils').logError
const validateSearchParams = require('../utilities/errorHandlingUtils').validateSearchParams
const sendInvalidInputRes = require('../utilities/apiUtils').sendInvalidInputRes
const sendServerErrorRes = require('../utilities/apiUtils').sendServerErrorRes


router.post('/addHome', async (req, res) => {
  const homeCount = await homeRepo.getHomeCount(logError)
  const params = req.body
  const newHome = {
    id: homeCount.toString(),
    dealType: params.dealType,
    area: params.area,
    address: params.address,
    buildingType: params.buildingType,
    imageUrl: params.imageUrl,
    isFromACMServer: false,
    basePrice: params.basePrice,
    rentPrice: params.rentPrice,
    sellingPrice: params.sellingPrice,
    expireTime: null,
  }


  if (validateHome(newHome)) {
    try {
      await homeRepo.addHome(newHome)
      res.send(JSON.stringify({'invalidInput': false, 'serverError': false}))
    } catch (e) {
      sendServerErrorRes(res)
    }
  } else {
    sendInvalidInputRes(res)
  }
})

router.get('/count', async (req, res) => {
  const homes = await homeRepo.searchHomes(null, null, null, null, logError)
  res.send(JSON.stringify(homes))
})

router.post('/getHomeById', async (req, res) => {
  const id = req.body.houseId
  let home
  try {
    home = await homeRepo.getHomeById(id)
    if (!home) {
      sendInvalidInputRes(res)
    }
    res.send(JSON.stringify(home))
  } catch (e) {
    sendServerErrorRes(res)
  }
})

router.post('/searchHomes', async (req, res) => {
  const body = req.body
  const searchParams = {
    minArea: body.minArea === "" ? null : parseFloat(body.minArea),
    maxPrice: body.maxPrice === "" ? null : parseFloat(body.maxPrice),
    dealType: body.dealType === "" ? null : body.dealType,
    buildingType: body.propertyType === "" ? null : body.propertyType
  }

  try {
    if (validateSearchParams(searchParams)) {
      const homes = await homeRepo.searchHomes(searchParams, logError)
      if (!homes) {
        sendInvalidInputRes(res)
      } else {
        res.send(JSON.stringify(homes))
      }
    } else {
      sendInvalidInputRes(res)
    }
  } catch (e) {
    sendServerErrorRes(res)
  }

})

module.exports = router