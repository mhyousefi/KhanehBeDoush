const router = require('express').Router()
const userRepo = require('../domain/userRepo')
const logError = require('../utilities/errorHandlingUtils').logError
const sendInvalidInputRes = require('../utilities/apiUtils').sendInvalidInputRes
const sendServerErrorRes = require('../utilities/apiUtils').sendServerErrorRes

router.post('/currentCredit', async (req, res) => {
  try {
    const id = req.body.userId
    const user = await userRepo.getUserById(id, logError)
    if (!user) {
      sendInvalidInputRes(res)
    } else {
      res.send(JSON.stringify({'credit': user.credit}))
    }
  } catch (e) {
    sendServerErrorRes(res)
  }
})

router.post('/increaseCredit', async (req, res) => {
  try {
    const id = req.body.userId
    const amount = req.body.amount
    const result = await userRepo.addCredit(id, amount, logError)
    if (!result) {
      sendInvalidInputRes(res)
    } else {
      res.send(JSON.stringify({'response': true}))
    }
  } catch (e) {
    sendServerErrorRes(res)
  }
})

module.exports = router