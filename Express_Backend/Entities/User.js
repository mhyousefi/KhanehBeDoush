class User {
  constructor (name, username, password) {
    this.name = name
    this.username = username
    this.password = password
  }

  getName () {
    return this.name
  }

  getUsername () {
    return this.username
  }

  getPassword () {
    return this.password
  }
}

class IndividualUser extends User {
  constructor (name, username, password, credit) {
    super(name, username, password)
    this.credit = credit || 0
  }

  getCredit() {
    return this.credit
  }

  updateCredit(amount) {
    this.credit += amount
  }
}

class AdminUser extends User {
  constructor (name, username, password) {
    super(name, username, password)
  }
}


module.exports.IndividualUser = IndividualUser
module.exports.AdminUser = AdminUser