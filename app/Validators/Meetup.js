'use strict'

class Meetup {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required',
      event_date: 'required|date',
      place: 'required',
      category: 'required'
    }
  }
}

module.exports = Meetup
