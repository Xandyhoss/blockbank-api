import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/healthCheck', 'HealthChecksController.healthCheck')
}).prefix('utils')
