import { checkStatus, parseJSON } from 'src/utilities/apiUtilities'
import { apiUrls } from 'src/constants/constants'

export const AddHomeAPI = (user, house) => {
  // console.log('token: ' + user['token'])
  // console.log('id: ' + user['id'])
  return fetch(apiUrls['addHome'], {
    method: 'POST',
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':  user['token'],
    },
    body: JSON.stringify({
      area: house['area'],
      buildingType: house['buildingType'],
      dealType: house['dealType'],
      sellingPrice: house['sellingPrice'],
      basePrice: house['basePrice'],
      rentPrice: house['rentPrice'],
      phoneNumber: house['phoneNumber'],
      address: house['address'].substr(2),
      id: user['id'],
    }),
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(function (data) {
      if (data['invalidInput'] && data['invalidInput'] === true) {
        return 'wrong input'
      } else if (data['serverError'] && data['serverError'] === true) {
        return 'server error'
      } else if (!data.status || data.status === false) {
        return 'server error'
      } else {
        return true
      }
    }).catch(function (error) {
      console.log('Fetch error ==> ' + error.message)
      return false
    })
}