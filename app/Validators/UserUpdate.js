'use strict'

class UserUpdate {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'required',
      password: 'confirmed'
    }
  }
}

module.exports = UserUpdate
