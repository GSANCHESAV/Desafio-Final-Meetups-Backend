'use strict'

const Preference = use('App/Models/Preference')
const User = use('App/Models/User')

class PreferenceController {
  async index ({ request, auth }) {
    const preferences = await Preference.findByOrFail('user_id', auth.user.id)

    return preferences
  }

  async store ({ request, response, auth }) {
    const preferenceValidation = await Preference.findBy(
      'user_id',
      auth.user.id
    )

    if (!preferenceValidation) {
      try {
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

        const user = await User.findByOrFail('id', auth.user.id)

        user.merge({ first_access: false })
        await user.save()

        return preferences
      } catch (err) {
        return response.status(err.status).send({
          error: {
            message: 'Não foi possivel definir suas preferências.'
          }
        })
      }
    } else {
      return response.send({
        error: {
          message: 'Vá no módulo de edicão para redefinir suas preferencias.'
        }
      })
    }
  }

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
