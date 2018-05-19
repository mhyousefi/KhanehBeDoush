import { sequelizeDb } from '../dbConfig'

const User = sequelizeDb('user', {
  name: sequelizeDb.STRING,
  username: sequelizeDb.STRING,
  password: sequelizeDb.STRING,
})

const addCredit = () => {
  // do something with "User"
}

module.exports.addCredit = addCredit