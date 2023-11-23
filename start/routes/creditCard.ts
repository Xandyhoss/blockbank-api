import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/create', 'CreditCardsController.create').middleware('holderAuth')
  Route.post('/activate', 'CreditCardsController.activate').middleware('managerAuth')
  Route.post('/updateLimit', 'CreditCardsController.updateLimit').middleware('managerAuth')
  Route.post('/updateName', 'CreditCardsController.updateName').middleware('holderAuth')
  Route.post('/createPurchase', 'CreditCardsController.createPurchase').middleware('holderAuth')
  Route.post('/payInvoice', 'CreditCardsController.payInvoice').middleware('holderAuth')
  Route.get('/:key', 'CreditCardsController.getCreditCard')
  Route.get('/:creditCard/purchases', 'CreditCardsController.getPurchases').middleware('holderAuth')
  Route.get('/:creditCard/payments', 'CreditCardsController.getPayments').middleware('holderAuth')
})
  .prefix('creditcard')
  .middleware(['checkLogin'])
