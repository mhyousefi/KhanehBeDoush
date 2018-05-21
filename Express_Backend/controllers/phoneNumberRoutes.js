const router = require('express').Router()
const paymentHistoryRepo = require('../domain/paymentHistoryRepo')
const userRepo = require('../domain/userRepo')
const homeRepo = require('../domain/homeRepo')
const logError = require('../utilities/errorHandlingUtils').logError
const sendInvalidInputRes = require('../utilities/apiUtils').sendInvalidInputRes
const sendServerErrorRes = require('../utilities/apiUtils').sendServerErrorRes


const sendSuccessfulResponse = (res) => {
  res.send({
    exists: true,
    status: true
  })
}

const sendInsufficientCreditResponse = (res) => {
  res.send({
    exists: true,
    status: false
  })
}

const hasEnoughCredit = (user) => {
  return user.credit >= 1000
}

router.post('/purchasePhoneNumber', async (req, res) => {
  try {
    const user = await userRepo.getUserById(req.body.userId, logError)
    const home = await homeRepo.getHomeById(req.body.homeId, logError)
    if (!home || !user) sendInvalidInputRes(res)
      
    else {
      if (await paymentHistoryRepo.hasPaidForPhoneNum(user.id, home.id, logError) !== null) {
        sendSuccessfulResponse(res)
      }
      else {
        if (!hasEnoughCredit(user)) sendInsufficientCreditResponse(res)
        else {
          const paymentResult = paymentHistoryRepo.addPaymentHistory(user.id, home.id, logError)
          if (!paymentResult) sendServerErrorRes(res)
          else {
            await userRepo.addCredit(user.id, -1000, logError)
            sendSuccessfulResponse(res)
          }
        }
      }
    }
  } catch (e) {
    sendServerErrorRes(res)
  }
})

router.post('/hasPaidForPhoneNumber', async (req, res) => {
  try {
    const userId = req.body.userId
    const homeId = req.body.homeId
    const result = await paymentHistoryRepo.hasPaidForPhoneNum(userId, homeId, logError)
    res.send(JSON.stringify({'result': result || false}))
  } catch (e) {
    sendServerErrorRes(res)
  }
})

module.exports = router