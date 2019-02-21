'use strict'

const Mail = use('Mail')

class NewForgotPasswordMail {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'NewForgotPasswordMail-job'
  }

  async handle ({ email, user }) {
    await Mail.send(
      ['emails.forgot_password', 'emails.forgot_password-text'],
      {
        email,
        token: user.token,
        link: `http://www.meetups.com.br/resetar?token=${user.token}`
      },
      message => {
        message
          .to(user.email)
          .from('email@meetups.com.br', 'Administrativo | Meetups')
          .subject('Recuperação de senha')
      }
    )
  }
}

module.exports = NewForgotPasswordMail
