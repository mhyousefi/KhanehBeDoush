const Joi = require('joi')

const logError = (err) => {
  if (err) {
    console.log(`The following error occurred while attempting database query: ${err.message}`)
  }
}

const validateHome = (home) => {
  const schema = {
    id: Joi.string().required().min(1),
    dealType: Joi.string().required().valid(['rent', 'sale']),
    buildingType: Joi.string().required().valid(['villa', 'apartment']),
    address: Joi.string().required(),
    imageUrl: Joi.string().uri().required(),
    isFromACMServer: Joi.boolean(),
    area: Joi.number().positive().required(),
    basePrice: Joi.number().positive().required(),
    rentPrice: Joi.number().positive().required(),
    sellingPrice: Joi.number().positive().required(),
    expireTime: Joi.date(),
  }

  return Joi.validate(home, schema)
}

const validateUser = (user) => {
  const schema = {
    id: Joi.string().required().min(1),
    name: Joi.string().required().min(1),
    username: Joi.string().required().min(1),
    password: Joi.string().required().min(1),
    isAdmin: Joi.boolean(),
    credit: Joi.number().positive().required(),
  }

  return Joi.validate(user, schema)
}

const validatePaymentHistory = (paymentHistory) => {
  const schema = {
    id: Joi.string().required().min(1),
    phoneNumber: Joi.string().required().length(11),
  }

  return Joi.validate(paymentHistory, schema)
}

const validateSearchParams = (searchResults) => {
  const schema = {
    dealType: Joi.string().valid(['rent', 'sale', null]),
    buildingType: Joi.string().valid(['villa', 'apartment', null]),
    minArea: Joi.number().positive(),
    maxPrice: Joi.number().positive(),
  }

  return Joi.validate(searchResults, schema)
}

module.exports.logError = logError
module.exports.validateHome = validateHome
module.exports.validateUser = validateUser
module.exports.validatePaymentHistory = validatePaymentHistory
module.exports.validateSearchParams = validateSearchParams
