'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Registration extends Model {
  static boot () {
    super.boot()

    this.addHook('afterSave', 'RegistrationHook.sendNewRegistrationMail')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  meetup () {
    return this.belongsTo('App/Models/Meetup')
  }
}

module.exports = Registration
