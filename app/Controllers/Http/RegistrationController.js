'use strict'

const Registration = use('App/Models/Registration')
const Meetup = use('App/Models/Meetup')

class RegistrationController {
  async index ({ auth }) {
    const allRegisters = await Registration.query()
      .where('user_id', auth.user.id)
      .pluck('meetup_id')

    const registerMeetups = await Meetup.query()
      .whereIn('id', allRegisters)
      .fetch()

    return registerMeetups
  }

  async store ({ params, auth }) {
    const registerExist = await Registration.query()
      .where('meetup_id', params.id)
      .where('user_id', auth.user.id)
      .first()

    if (registerExist === 'undefined' || registerExist === null) {
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
    } else {
      return false
    }
  }

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

    return data.registered
  }
}

module.exports = RegistrationController
