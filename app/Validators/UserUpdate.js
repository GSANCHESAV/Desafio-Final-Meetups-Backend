'use strict'

class UserUpdate {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'required',
      password: 'required|confirmed'
    }
  }
}

module.exports = UserUpdate
