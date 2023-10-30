import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/create', 'HoldersController.create').middleware('managerAuth')
  Route.post('/transferency', 'HoldersController.transferency').middleware('holderAuth')
  Route.post('/deposit', 'HoldersController.deposit').middleware('holderAuth')
  Route.post('/withdraw', 'HoldersController.withdraw').middleware('holderAuth')
})
  .prefix('holder')
  .middleware(['checkLogin'])
