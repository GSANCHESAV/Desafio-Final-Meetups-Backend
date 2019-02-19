'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RegistrationSchema extends Schema {
  up () {
    this.create('registrations', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('meetup_id')
        .unsigned()
        .references('id')
        .inTable('meetups')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.boolean('registered').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('registrations')
  }
}

module.exports = RegistrationSchema
