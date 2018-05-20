const express = require('express')
const createTables = require('./models/index').createTables

createTables()

const app = express()
const port = process.env.port || 8080

app.get('/', async (req, res) => {
  //TODO: routing needs to be done
})

app.listen(port)
console.log(`Listening on port ${port}`)
