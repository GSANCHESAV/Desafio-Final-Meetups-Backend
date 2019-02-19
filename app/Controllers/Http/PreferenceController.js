'use strict'

const Preference = use('App/Models/Preference')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with preferences
 */
class PreferenceController {
  /**
   * Show a list of all preferences.
   * GET preferences
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, auth }) {
    const preferences = await Preference.findByOrFail('user_id', auth.user.id)

    return preferences
  }

  /**
   * Create/save a new preference.
   * POST preferences
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const data = request.only([
      'frontend',
      'backend',
      'mobile',
      'devops',
      'gestao',
      'marketing'
    ])

    const preferences = await Preference.create({
      ...data,
      user_id: auth.user.id
    })

    return preferences
  }

  /**
   * Update preference details.
   * PUT or PATCH preferences/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ request, auth }) {
    const preference = await Preference.findByOrFail('user_id', auth.user.id)

    const data = request.only([
      'frontend',
      'backend',
      'mobile',
      'devops',
      'gestao',
      'marketing'
    ])

    preference.merge(data)
    await preference.save()

    return preference
  }
}

module.exports = PreferenceController
