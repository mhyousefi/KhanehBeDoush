import { checkStatus, parseJSON } from 'src/utilities/apiUtilities'
import { apiUrls } from 'src/constants/constants'

export const SignInAPI = async (username, password, phoneNumber) => {
  return fetch(apiUrls['signIn'], {
    method: 'GET',
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
    .then(function (data, response) {
      if (response.status === 400) {
        return 'wrong input'
      } else if (response === 504) {
        return 'server error'
      } else {
        return data
      }
    }).catch(function (error) {
      console.log("Fetch error ==> " + error.message)
      return false
    })
}