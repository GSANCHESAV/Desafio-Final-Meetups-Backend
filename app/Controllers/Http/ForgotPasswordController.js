'use strict'

const moment = require('moment')
const crypto = require('crypto')
const User = use('App/Models/User')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Algo não deu certo, esse e-mail está correto?' }
      })
    }
  }

  async update ({ request, response }) {
    try {
      const { token, password } = request.all()

      const user = await User.findByOrFail('token', token)

      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at)

      if (tokenExpired) {
        return response.status(401).send({
          error: {
            message:
              'O Token de recuperação está expirado. Faça uma nova solicitação.'
          }
        })
      }

      user.token = null
      user.token_created_at = null
      user.password = password

      await user.save()
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Algo deu errado ao resetar sua senha.' }
      })
    }
  }
}

module.exports = ForgotPasswordController
