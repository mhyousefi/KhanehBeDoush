import { checkStatus, parseJSON } from 'src/utilities/apiUtilities'
import { apiUrls } from 'src/constants/constants'

export const SignInAPI = async (username, password) => {
  return fetch(apiUrls['signin'], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'username': username,
      'password': password
    }),
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(function (data) {
      // not sure what to do here
    }).catch(function (error) {
      console.log("Fetch error ==> " + error.message)
      return false
    })
}