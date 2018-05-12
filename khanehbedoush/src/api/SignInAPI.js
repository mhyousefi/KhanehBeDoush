import { checkStatus, parseJSON } from 'src/utilities/apiUtilities'
import { apiUrls } from 'src/constants/constants'

export const SignInAPI = async (username, password, phoneNumber) => {
  return fetch(apiUrls['signIn'], {
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
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      } else if (response.status === 400) {
        return 'wrong input'
      } else if (response.status === 504) {
        return 'server error'
      }
    }).catch(function (error) {
      console.log("Fetch error ==> " + error.message)
      return false
    })
}