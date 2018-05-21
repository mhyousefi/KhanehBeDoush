'use strict'

const User = require('../models/user')

const addUser = async (newUser, errCallback) => {
  try {
    await User.create({
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      password: newUser.password,
      credit: newUser.credit,
      isAdmin: newUser.isAdmin,
    }).then(user => {
      if (!user) errCallback(new Error('Could not add user'))
      else return user
    })
  } catch (e) {
    errCallback(new Error(err.message))
  }
}

const getUserById = async (id, errCallback) => {
  try {
    return await User.findById(id).then(user => {
      if (!user) errCallback(new Error('User was not found'))
      else return user
    })
  } catch (err) {
    errCallback(new Error(err.message))
  }
}

const getAllUsers = async (errCallback) => {
  try {
    return await User.findAll().then(users => {
      if (!users) errCallback(new Error('Could not fetch all users'))
      else return users
    })
  } catch (err) {
    errCallback(new Error(err.message))
  }
}

const addCredit = async (id, amount, errorCallback) => {
  try {
    const user = await getUserById(id)
    if (!user) errCallback(new Error('user not found'))
    await User.update(
      { credit: user.credit + amount },
      { where: { id: id } }
    )
      .then(result => {
        return result
      })
      .catch(err =>
        errCallback(err.message)
      )
  } catch (err) {
    errorCallback(err.message)
  }
}

const getCurrentCredit = async (id, errorCallback) => {
  try {
    const user = await getUserById(id)
    if (!user) errorCallback(new Error('User was not found'))
    else return user.credit
  } catch (err) {
    errorCallback(err.message)
  }
}

module.exports.addUser = addUser
module.exports.getAllUsers = getAllUsers
module.exports.getUserById = getUserById
module.exports.addCredit = addCredit
module.exports.getCurrentCredit = getCurrentCredit

