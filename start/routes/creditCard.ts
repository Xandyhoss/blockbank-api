import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/create', 'CreditCardsController.create')
})
  .prefix('creditcard')
  .middleware(['checkLogin', 'holderAuth'])
