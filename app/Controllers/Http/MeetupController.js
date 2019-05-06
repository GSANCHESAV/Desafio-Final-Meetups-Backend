'use strict'

const Meetup = use('App/Models/Meetup')
const Preferences = use('App/Models/Preference')

class MeetupController {
  async index ({ request, auth }) {
    const { page } = request.get()

    const userPreferences = await Preferences.findByOrFail(
      'user_id',
      auth.user.id
    )

    const attributes = Object.entries(userPreferences).filter(
      attr => attr[0] === '$attributes'
    )

    const meetupObj = attributes[0][1]

    const preferencesName = Object.entries(meetupObj)
      .filter(pref => pref[1] === true)
      .map(pref => pref[0])

    const meetups = await Meetup.query()
      .whereIn('category', preferencesName)
      .with('user')
      .paginate(page, 6)

    return meetups
  }

  async store ({ request, auth }) {
    const data = request.only([
      'title',
      'place',
      'category',
      'description',
      'cover_url'
    ])

    const meetup = await Meetup.create({
      ...data,
      user_id: auth.user.id
    })

    return meetup
  }

  async show ({ params }) {
    const meetup = await Meetup.findOrFail(params.id)

    await meetup.load('user')

    return meetup
  }

  async update ({ params, request }) {
    const meetup = await Meetup.findOrFail(params.id)
    const data = request.only([
      'title',
      'place',
      'category',
      'description',
      'cover_url'
    ])

    meetup.merge(data)
    await meetup.save()

    return meetup
  }

  async destroy ({ params }) {
    const meetup = await Meetup.findOrFail(params.id)

    await meetup.delete()
  }
}

module.exports = MeetupController
