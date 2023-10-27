import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/create', 'HoldersController.create').middleware('managerAuth')
  Route.post('/transferency', 'HoldersController.transferency').middleware('holderAuth')
})
  .prefix('holder')
  .middleware(['checkLogin'])
