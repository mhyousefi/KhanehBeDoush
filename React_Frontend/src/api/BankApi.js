import { checkStatus, parseJSON } from 'src/utilities/apiUtilities'
import { apiUrls } from 'src/constants/constants'

export const changeCreditAPI = async (amount, token) => {
  return fetch(apiUrls['increaseCredit'], {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({
      'credit': amount,
    }),
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(function (data) {
      return data.response === 'true';
    }).catch(function (error) {
      console.log("Fetch error ==> " + error.message)
      return false
  })
}

export const currentCreditAPI = (token) => {
  return fetch(apiUrls['currentCredit'], {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(function (data) {
      return data.currentCredit
    }).catch(function (error) {
      console.log("Fetch error ==> " + error.message)
      return false
    })
}


