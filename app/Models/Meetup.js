'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Meetup extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  registration () {
    return this.hasMany('App/Models/Registration')
  }

  files () {
    return this.hasMany('App/Models/File')
  }
}

module.exports = Meetup
