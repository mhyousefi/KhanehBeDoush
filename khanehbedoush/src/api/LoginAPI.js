import { checkStatus, parseJSON } from 'src/utilities/apiUtilities'
import { apiUrls } from 'src/constants/constants'

export const LoginAPI = async (username, password, phoneNumber) => {
  return fetch(apiUrls['login'], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'username': username,
      'password': password,
      'phoneNumber': phoneNumber,
    }),
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(function(data) {
      console.log("ENTERED MOSTARAH!")
      console.log(data)
      if (data['invalidInput'] && data['invalidInput'] === true) {
        return 'wrong input'
      } else if (data['serverError'] && data['serverError'] === true) {
        return 'server error'
      } else {
        return data
      }
    }).catch(function (error) {
      console.log("Fetch error ==> " + error.message)
      return false
    })
}