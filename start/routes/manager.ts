import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/create', 'ManagersController.create').middleware('managerAuth')
  Route.get('/list', 'ManagersController.list').middleware('managerAuth')
})
  .prefix('manager')
  .middleware(['checkLogin'])
