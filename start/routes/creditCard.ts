import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/create', 'CreditCardsController.create').middleware('holderAuth')
  Route.post('/activate', 'CreditCardsController.activate').middleware('managerAuth')
})
  .prefix('creditcard')
  .middleware(['checkLogin'])
