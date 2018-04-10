export const payForPhoneNum = (houseId) => {
	fetch('localhost:8080/showHousePhoneNumber', {
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/json'
	  },
	  body: JSON.stringify({
    		houseId : houseId
		})
	})
	fetch('localhost:8080/showHousePhoneNumber')
	  .then(checkStatus)
	  .then(parseJSON)
	  .then(function(data) {
	  	console.log('parsed json', data)
	  	return data
	  }).catch(function(error) {
	  	return false
	})
}

export const hasPaidForPhoneNum = (houseId) => {
	fetch('localhost:8080/hasPaidForPhoneNum', {
	  method: 'GET',
	  headers: {
	    'Content-Type': 'application/json'
	  },
	  body: JSON.stringify({
    		houseId : houseId
		})
	})
	fetch('localhost:8080/hasPaidForPhoneNum')
	  .then(checkStatus)
	  .then(parseJSON)
	  .then(function(data) {
	  	return (data.result === "true")
	  }).catch(function(error) {
	  	return false
	})
}