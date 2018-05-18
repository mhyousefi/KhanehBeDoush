import { checkStatus, parseJSON } from 'src/utilities/apiUtilities'
import { apiUrls } from '../constants/constants'

export const payForPhoneNumAPI = (token, houseId) => {
  return fetch(apiUrls['addHome'], {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
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

export const hasPaidForPhoneNumAPI = (token, houseId) => {
  return fetch(apiUrls['hasPaidForPhoneNum'], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
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