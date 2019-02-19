'use strict'

const Kue = use('Kue')
const Job = use('App/Jobs/NewRegistrationMail')

const RegistrationHook = (exports = module.exports = {})
const User = use('App/Models/User')
const Meetup = use('App/Models/Meetup')

RegistrationHook.sendNewRegistrationMail = async registrationInstance => {
  if (registrationInstance.registered === true) {
    const { email, username } = await User.findOrFail(
      registrationInstance.user_id
    )
    const { title } = await Meetup.findOrFail(registrationInstance.meetup_id)

    Kue.dispatch(Job.key, { username, title, email }, { attempts: 3 })
  }
}
