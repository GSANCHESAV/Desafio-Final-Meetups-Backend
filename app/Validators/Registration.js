'use strict'

class Registration {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required|boolean'
    }
  }
}

module.exports = Registration
