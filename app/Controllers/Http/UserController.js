'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create(data)

    return user
  }

  /**
   * Update project details.
   * PUT or PATCH users/:id
   */
  async update ({ request, auth }) {
    const user = await User.findOrFail(auth.user.id)
    const data = request.only(['username', 'password'])

    user.merge(data)
    await user.save()

    return user
  }
}

module.exports = UserController
