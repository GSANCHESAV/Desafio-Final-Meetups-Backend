'use strict'

const User = use('App/Models/User')

class UserController {
  async show ({ auth }) {
    const userLogued = await User.query()
      .where('id', auth.user.id)
      .select('username', 'email', 'first_access')
      .first()

    const user = userLogued.toJSON()

    return user
  }

  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create(data)

    return user
  }

  async update ({ request, auth }) {
    const user = await User.findOrFail(auth.user.id)
    const data = request.only(['username', 'password'])

    if (data.password === null) {
      const name = request.only(['username'])
      user.merge(name)
      await user.save()
    } else {
      user.merge(data)
      await user.save()
    }

    return user
  }
}

module.exports = UserController
