'use strict'

const Mail = use('Mail')

class NewRegistrationMail {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'NewRegistrationMail-job'
  }

  async handle ({ username, title, email }) {
    await Mail.send(['emails.registration'], { username, title }, message => {
      message
        .to(email)
        .from('guilherme@meetups.com', 'Guilherme | Meetups')
        .subject('Incrição confirmada')
    })
  }
}

module.exports = NewRegistrationMail
