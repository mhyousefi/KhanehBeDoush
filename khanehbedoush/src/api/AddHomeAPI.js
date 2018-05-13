import { checkStatus, parseJSON } from 'src/utilities/apiUtilities'
import { apiUrls } from 'src/constants/constants'

export const AddHomeAPI = (house, token) => {
  return fetch(apiUrls['addHome'], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({
      area: house.area,
      buildingType: house.buildingType,
      dealType: house.dealType,
      sellingPrice: house.sellingPrice,
      basePrice: house.basePrice,
      rentPrice: house.rentPrice,
      phoneNumber: house.phoneNumber,
      address: house.address,
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