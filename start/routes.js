'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
)
Route.put('passwords', 'ForgotPasswordController.update').validator(
  'ResetPassword'
)

Route.get('/files/:id', 'FileController.show')
Route.get('meetups/:id/registration', 'RegistrationController.index')

Route.group(() => {
  Route.put('users', 'UserController.update').validator('UserUpdate')
  Route.get('users', 'UserController.show')
  Route.get('registered', 'RegistrationController.index')

  Route.post('/files', 'FileController.store')

  Route.get('preferences', 'PreferenceController.index')
  Route.post('preferences', 'PreferenceController.store')
  Route.put('preferences', 'PreferenceController.update')

  Route.resource('meetups', 'MeetupController')
    .apiOnly()
    .validator(new Map([[['meetups.store', 'meetups.update'], ['Meetup']]]))

  Route.post('meetups/:id/registration', 'RegistrationController.store')
  Route.put('meetups/:id/registration', 'RegistrationController.update')

  Route.get('/logout', async ({ auth, response }) => {
    await auth.logout()
    return response.redirect('/')
  })
}).middleware(['auth'])
