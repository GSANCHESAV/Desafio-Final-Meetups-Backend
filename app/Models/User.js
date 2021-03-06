'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })

    this.addHook('afterSave', 'ForgotPasswordHook.sendForgotPasswordEmail')
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  files () {
    return this.hasMany('App/Models/File')
  }

  meetups () {
    return this.hasMany('App/Models/Meetup')
  }

  registration () {
    return this.hasMany('App/Models/Registration')
  }
}

module.exports = User
