const router = require('express').Router()
const paymentHistoryRepo = require('../domain/paymentHistoryRepo')
const logError = require('../utilities/errorHandlingUtils').logError

router.post('/purchasePhoneNumber', async (req, res) => {

})

router.post('/hasPaidForPhoneNumber', async (req, res) => {
  try {
    const id = req.body.userId
    const phoneNumber = req.body.phoneNumber
    const result = await paymentHistoryRepo.hasPaidForPhoneNum(id, phoneNumber, logError)
    res.send(JSON.stringify({'result': result}))
  } catch (e) {
    res.send(JSON.stringify({'invalidInput': false, 'serverError': true}))
  }
})

module.exports = router