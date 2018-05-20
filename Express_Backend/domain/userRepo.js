const User = require('../models/user')

console.log(User)

const createUser = async (id, name, username, password, credit, userType) => {
  const user = await User.create({
    id: id,
    name: name,
    username: username,
    password: password,
    credit: credit,
    userType: userType,
  })
  console.log(user);
  return user;
}

const getAllUsers = async () => {
  return await User.findAll({});
}

const getUserById = async (id) => {
  return await User.findById(id)
}

const addCredit = async (id, amount) => {
  const user = await User.findById(id)
  await user.update({
    credit: user.credit + amount
  })
}


module.exports.createUser = createUser
module.exports.getAllUsers = getAllUsers
module.exports.getUserById = getUserById
module.exports.addCredit = addCredit

