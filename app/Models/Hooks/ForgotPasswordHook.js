'use strict'

const Kue = use('Kue')
const Job = use('App/Jobs/NewForgotPasswordMail')

const ForgotPasswordHook = (exports = module.exports = {})
const User = use('App/Models/User')

ForgotPasswordHook.sendForgotPasswordEmail = async forgotPasswordInstance => {
  const { email } = forgotPasswordInstance
  const user = await User.findBy('email', email)

  Kue.dispatch(Job.key, { email, user }, { attempts: 3 })
}
