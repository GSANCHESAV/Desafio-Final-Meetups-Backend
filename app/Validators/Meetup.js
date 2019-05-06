'use strict'

class Meetup {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required',
      place: 'required',
      category: 'required'
    }
  }
}

module.exports = Meetup
