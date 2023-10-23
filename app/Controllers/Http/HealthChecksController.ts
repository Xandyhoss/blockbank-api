import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { healthCheckTx } from 'App/Transactions/healthCheck'

export default class HealthChecksController {
  public async healthCheck({ response }: HttpContextContract) {
    const res = await healthCheckTx()
    response.json(res)
  }
}
