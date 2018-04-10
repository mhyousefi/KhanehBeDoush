import { checkStatus, parseJSON } from 'src/Utilities/apiUtilities'


export const changeCredit = (amount) => {
  fetch('localhost:8080/increaseCredit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      credit: amount,
    }),
  })
  fetch('localhost:8080/increaseCredit')
    .then(checkStatus)
    .then(parseJSON)
    .then(function (data) {
      console.log('parsed json field', data.response)
      return (data.response === 'true')
    }).catch(function (error) {
    return false
  })
}


