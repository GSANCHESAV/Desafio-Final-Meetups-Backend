'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Preference extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  file () {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Preference
