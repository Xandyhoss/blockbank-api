import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/create', 'HoldersController.create')
})
  .prefix('holder')
  .middleware(['checkLogin', 'managerAuth'])
