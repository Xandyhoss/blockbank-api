import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/create', 'ManagersController.create').middleware('managerAuth')
})
  .prefix('manager')
  .middleware(['checkLogin'])
