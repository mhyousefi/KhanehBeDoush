const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const parseJSON = (response) => {
  return response.json()
}

const sendInvalidInputRes = (res) => {
  res.send(JSON.stringify({'invalidInput': true, 'serverError': false}))
}

const sendServerErrorRes = (res) => {
  res.send(JSON.stringify({'invalidInput': false, 'serverError': true}))
}

module.exports.checkStatus = checkStatus
module.exports.parseJSON = parseJSON
module.exports.sendInvalidInputRes = sendInvalidInputRes
module.exports.sendServerErrorRes = sendServerErrorRes