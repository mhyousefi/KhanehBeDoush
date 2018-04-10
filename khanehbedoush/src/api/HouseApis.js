import { checkStatus, parseJSON } from 'src/Utilities/apiUtilities'

export const searchHouses = (maxPrice, minArea, propertyType, dealType) => {
	fetch('localhost:8080/searchResults', {
	  method: 'GET',
	  headers: {
	    'Content-Type': 'application/json'
	  },
	  body: JSON.stringify({
    		minArea: minArea,
    		maxPrice : maxPrice,
    		propertyType : propertyType,
    		dealType : dealType
		})
	})
	fetch('localhost:8080/searchResults')
	  .then(checkStatus)
	  .then(parseJSON)
	  .then(function(data) {
	  	console.log('parsed json field', data.results)
	  	return data.results
	  }).catch(function(error) {
	    return false
	})
}

// export const getHouseWithId = (houseId) => {
//   return testHouses[parseInt(houseId, 10)]
// }