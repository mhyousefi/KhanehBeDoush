import { checkStatus, parseJSON } from 'src/Utilities/apiUtilities'
import { apiUrls } from 'src/constants/constants'

export const changeCredit = async (amount) => {
  return fetch(apiUrls['increaseCredit'], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
      console.log("Fetch error ==> " + error)
      return false
  })
}


