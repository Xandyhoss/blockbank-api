import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/create', 'HoldersController.create').middleware('managerAuth')
  Route.post('/transferency', 'HoldersController.transferency').middleware('holderAuth')
  Route.post('/deposit', 'HoldersController.deposit').middleware('holderAuth')
  Route.post('/withdraw', 'HoldersController.withdraw').middleware('holderAuth')
  Route.post('/purchase', 'HoldersController.purchase').middleware('holderAuth')
  Route.get('/list', 'HoldersController.list').middleware('managerAuth')
})
  .prefix('holder')
  .middleware(['checkLogin'])
