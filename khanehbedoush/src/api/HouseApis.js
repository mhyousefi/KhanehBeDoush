import { checkStatus, parseJSON } from 'src/Utilities/apiUtilities'
import { apiUrls } from 'src/constants/constants'
import { testHouses } from 'src/constants/FaTexts'


export const searchHouses = async (maxPrice, minArea, propertyType, dealType) => {
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
      console.log("Fetch error ==> " + error.message)
      return false
    })
}

export const getHouseWithId = (houseId) => {
  return testHouses[parseInt(houseId, 10)]
}