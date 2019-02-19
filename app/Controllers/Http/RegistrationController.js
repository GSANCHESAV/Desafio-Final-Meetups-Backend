'use strict'

const Registration = use('App/Models/Registration')
const Meetup = use('App/Models/Meetup')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with registrations
 */
class RegistrationController {
  /**
   * Create/save a new registration.
   * POST registrations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params, auth }) {
    const registerExist = await Registration.query()
      .where('meetup_id', params.id)
      .where('user_id', auth.user.id)
      .first()

    if (registerExist === 'undefined') {
      const meetup = await Meetup.findOrFail(params.id)

      const register = await Registration.create({
        registered: true,
        meetup_id: meetup.id,
        user_id: auth.user.id
      })

      // Count and save new meetup num_subs value.
      const enrolled = await Registration.query()
        .where('meetup_id', params.id)
        .where('registered', true)
        .getCount()

      const numMeetup = { num_subs: enrolled }

      meetup.merge(numMeetup)
      await meetup.save()

      return register
    }
  }

  /**
   * Update registration details.
   * PUT or PATCH registrations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, auth }) {
    const meetup = await Meetup.findOrFail(params.id)
    // Change and save new registered value.
    const register = await Registration.query()
      .where('meetup_id', params.id)
      .where('user_id', auth.user.id)
      .first()

    const data = { registered: !register.registered }

    register.merge(data)
    await register.save()
    // Count and save new meetup num_subs value.
    const enrolled = await Registration.query()
      .where('meetup_id', params.id)
      .where('registered', true)
      .getCount()

    const numMeetup = { num_subs: enrolled }

    meetup.merge(numMeetup)
    await meetup.save()

    return register
  }
}

module.exports = RegistrationController
