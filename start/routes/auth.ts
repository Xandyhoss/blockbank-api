import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.post('/logout', 'AuthController.logout')
  Route.get('/', 'AuthController.getLogged')
})
  .prefix('auth')
  .middleware('checkLogin')
