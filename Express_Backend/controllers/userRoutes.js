const router = require('express').Router()
const userRepo = require('../domain/userRepo')
const logError = require('../utilities/errorHandlingUtils').logError

router.post('/currentCredit', async (req, res) => {
  try {
    const id = req.body.userId
    const user = await userRepo.getUserById(id, logError)
    console.log(`USER IS ======> ${JSON.stringify(user)}`)
    if (!user) {
      res.send(JSON.stringify({'invalidInput': true, 'serverError': false}))
    } else {
      res.send(JSON.stringify({'credit': user.credit}))
    }
  } catch (e) {
    res.send(JSON.stringify({'invalidInput': false, 'serverError': true}))
  }
})

router.post('/increaseCredit', async (req, res) => {
  try {
    const id = req.body.userId
    const amount = req.body.amount
    const result = await userRepo.addCredit(id, amount, logError)
    console.log(`result: ${JSON.stringify(result)}`)
    if (!result) {
      res.send(JSON.stringify({'invalidInput': true, 'serverError': false}))
    } else {
      res.send(JSON.stringify({'response': true}))
    }
  } catch (e) {
    res.send(JSON.stringify({'invalidInput': false, 'serverError': true}))
  }
})

module.exports = router