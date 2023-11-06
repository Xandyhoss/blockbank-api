import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import { createManagerTx, listManagersTx } from 'App/Transactions/manager'

export default class ManagersController {
  public async create({ request, response }: HttpContextContract) {
    const managerCreateValidator = schema.create({
      username: schema.string({ trim: true }, [
        rules.minLength(8),
        rules.unique({ table: 'users', column: 'username' }),
      ]),
      password: schema.string({ trim: true }, [rules.minLength(8)]),
      name: schema.string(),
      document: schema.string(),
    })

    const payload = await request.validate({ schema: managerCreateValidator })

    const transaction = await Database.transaction(async (trx) => {
      const manager = new User()
      manager.useTransaction(trx)

      manager.username = payload.username
      manager.password = payload.password
      manager.accountType = 1

      const response = await createManagerTx({ ...payload })

      if (response.type === 'success') {
        manager.holderKey = response.value['@key']
        await manager.save()
      } else {
        trx.rollback()
      }

      return { manager, response }
    })

    if (transaction.response.type === 'success') {
      return response.status(200).json(transaction.manager)
    }
    return response.status(500).json(transaction.response.error)
  }

  public async list({ response }: HttpContextContract) {
    const res = await listManagersTx()

    if (res.type === 'success') {
      return response.status(200).json(res.value)
    }
    return response.status(500).json(res.error)
  }
}
