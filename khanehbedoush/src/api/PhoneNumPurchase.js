import { checkStatus, parseJSON } from 'src/Utilities/apiUtilities'
import { apiUrls } from '../constants/constants'

export const payForPhoneNumAPI = (houseId) => {
  return fetch(apiUrls['payForPhone'], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      houseId: houseId,
    }),
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(function (data) {
      return data
    }).catch(function (error) {
    console.log('Fetch error ==> ' + error.message)
    return false
  })
}

export const hasPaidForPhoneNumAPI = (houseId) => {
  return fetch(apiUrls['hasPaidForPhoneNum'], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      houseId: houseId,
    }),
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(function (data) {
      return (data.result === 'true')
    }).catch(function (error) {
    console.log('Fetch error ==> ' + error.message)
    return false
  })
}