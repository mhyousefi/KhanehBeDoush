const express = require('express')
const userRepo = require('./domain/userRepo')
const houseRepo = require('./domain/houseRepo')
const createTables = require('./models/index').createTables

createTables()

const app = express()
const port = process.env.port || 8080

app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

app.listen(port)
console.log(`Listening on port ${port}`)
