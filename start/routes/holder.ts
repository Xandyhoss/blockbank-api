import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/create', 'HoldersController.create').middleware('managerAuth')
  Route.post('/transferency', 'HoldersController.transferency').middleware('holderAuth')
  Route.post('/deposit', 'HoldersController.deposit').middleware('holderAuth')
  Route.post('/withdraw', 'HoldersController.withdraw').middleware('holderAuth')
  Route.post('/purchase', 'HoldersController.purchase').middleware('holderAuth')
  Route.get('/list', 'HoldersController.list').middleware('managerAuth')
  Route.get('/:key', 'HoldersController.getHolder').middleware('managerAuth')
  Route.get('/:key/deposits', 'HoldersController.getDeposits').middleware('holderAuth')
  Route.get('/:key/withdrawals', 'HoldersController.getWithdrawals').middleware('holderAuth')
  Route.post('/:key/transfers', 'HoldersController.getTransfers').middleware('holderAuth')
  Route.get('/:key/purchases', 'HoldersController.getPurchases').middleware('holderAuth')
})
  .prefix('holder')
  .middleware(['checkLogin'])
