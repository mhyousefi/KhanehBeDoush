import { apiUrls } from 'src/constants/constants'
import Fa from 'src/constants/Fa'
import { checkStatus, parseJSON } from 'src/Utilities/apiUtilities'

export const searchHousesAPI = async (maxPrice, minArea, propertyType, dealType) => {
  return fetch(apiUrls['searchHouse'], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'minArea': '230',
      'maxPrice': '10000000000000',
      'propertyType': '',
      'dealType': '',
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

export const getHouseWithIdAPI = (houseId) => {
  return fetch(apiUrls['getHouseById'], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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

export const getHouseWithId = (houseId) => {
  getHouseWithIdAPI(houseId).then((response) => {
    console.log('response: ')
    console.log(response)

    let priceInfo = {}
    if (response['dealType'] === Fa['purchase']) {
      priceInfo = {'sellingPrice': response['sellingPrice'],}
    } else if (response['dealType'] === Fa['purchase']) {
      priceInfo = {
        'basePrice': response['basePrice'],
        'rentPrice': response['rentPrice'],
      }
    }

    return {
      'priceInfo': priceInfo,
      'dealType': response['dealType'],
      'propertyType': response['propertyType'],
      'phoneNumber': response['phoneNumber'],
      'area': response['area'],
      'district': response['address'],
      'description': response['description'],
      'imageUrl': response['imageUrl'],
    }
  })
}