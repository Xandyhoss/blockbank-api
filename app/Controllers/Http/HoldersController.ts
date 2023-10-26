import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import { createHolderTx } from 'App/Transactions/holders'

export default class HoldersController {
  public async create({ request, response }: HttpContextContract) {
    const userCreatorValidator = schema.create({
      username: schema.string({ trim: true }, [
        rules.minLength(8),
        rules.unique({ table: 'users', column: 'username' }),
      ]),
      password: schema.string({ trim: true }, [rules.minLength(8)]),
      name: schema.string(),
      document: schema.string(),
      cash: schema.number(),
      ccAvailable: schema.boolean(),
    })

    const payload = await request.validate({ schema: userCreatorValidator })

    const transaction = await Database.transaction(async (trx) => {
      const holder = new User()
      holder.useTransaction(trx)

      holder.username = payload.username
      holder.password = payload.password
      holder.accountType = 0

      const response = await createHolderTx({ ...payload })

      if (response.type === 'success') {
        holder.holderKey = response.value['@key']
        await holder.save()
      } else {
        trx.rollback()
      }

      return { holder, response }
    })

    if (transaction.response.type === 'success') {
      return response.status(200).json(transaction.holder)
    }
    return response.status(500).json(transaction.response.error)
  }
}
