'use strict'

const PaymentHistory = require('../models/paymentHistory')

const addPaymentHistory = async (userId, homeId, errCallback) => {
  try {
    return await PaymentHistory.create({
      userId: userId,
      homeId: homeId,
    }).then(paymentHistory => {
      if (paymentHistory === null) errCallback(new Error('Could not add payment history'))
      else return paymentHistory
    })
  } catch (err) {
    errCallback(new Error(err.message))
  }
}

const hasPaidForPhoneNum = async (userId, homeId, errCallback) => {
  try {
    return await PaymentHistory.findOne({
      where: {
        userId: userId,
        homeId: homeId,
      }
    }).then(res => {
      return (res && res.userId === userId && res.homeId === homeId)
    })
  } catch (err) {
    errCallback(new Error(err.message))
  }
}

module.exports.addPaymentHistory = addPaymentHistory
module.exports.hasPaidForPhoneNum = hasPaidForPhoneNum