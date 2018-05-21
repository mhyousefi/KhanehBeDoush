'use strict'

const PaymentHistory = require('../models/paymentHistory')

const addPaymentHistory = async (id, phoneNumber, errCallback) => {
  try {
    return await PaymentHistory.create({
      userId: id,
      phoneNumber: phoneNumber,
    }).then(paymentHistory => {
      if (!paymentHistory) errCallback(new Error('Could not add payment history'))
      else return paymentHistory
    })
  } catch (err) {
    errCallback(new Error(err.message))
  }
}

const hasPaidForPhoneNum = async (id, phoneNumber, errCallback) => {
  try {
    return await PaymentHistory.findOne({
      where: {
        userId: id,
        phoneNumber: phoneNumber,
      }
    }).then(paymentHistory => {
      if (!paymentHistory) {
        return false
      }
      else {
        return true
      }
    })
  } catch (err) {
    errCallback(new Error(err.message))
  }
}

module.exports.addPaymentHistory = addPaymentHistory
module.exports.hasPaidForPhoneNum = hasPaidForPhoneNum