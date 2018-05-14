import { apiUrls } from 'src/constants/constants'
import { checkStatus, parseJSON } from 'src/utilities/apiUtilities'

export const searchHousesAPI = async (maxPrice, minArea, propertyType, dealType) => {
  return fetch(apiUrls['searchHouse'], {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'minArea': minArea || '',
      'maxPrice': maxPrice || '',
      'propertyType': propertyType || '',
      'dealType': dealType || '',
    }),
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(function (data) {
      return data.results
    }).catch(function (error) {
      console.log('Fetch error ==> ' + error.message)
      return false
    })
}

export const getHouseWithIdAPI = (houseId, token) => {
  return fetch(apiUrls['getHouseById'], {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({
      'houseId': houseId,
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