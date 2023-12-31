import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import {
  createHolderTx,
  createPurchaseTx,
  createTransferencyTx,
  getDepositsByHolderKeyTx,
  getHolderByKeyTx,
  getPurchasesByHolderKeyTx,
  getTransfersByHolderKeyTx,
  getWithdrawalsByHolderKeyTx,
  listHoldersTx,
  makeDepositTx,
  makeWithdrawTx,
} from 'App/Transactions/holders'

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
      cash: schema.number.optional(),
      ccAvailable: schema.boolean.optional(),
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

  public async transferency({ auth, request, response }: HttpContextContract) {
    const createTransferencyValidator = schema.create({
      receiverKey: schema.string(),
      value: schema.number(),
    })

    const payload = await request.validate({ schema: createTransferencyValidator })

    const user = auth.user!

    const requestPayload = {
      sender: {
        '@assetType': 'holder',
        '@key': user?.holderKey,
      },
      receiver: {
        '@assetType': 'holder',
        '@key': payload.receiverKey,
      },
      value: payload.value,
    }

    const res = await createTransferencyTx(requestPayload)

    if (res.type === 'success') {
      return response.status(200).json(res.value)
    }
    return response.status(500).json(res.error)
  }

  public async deposit({ auth, request, response }: HttpContextContract) {
    const makeDepositValidator = schema.create({
      value: schema.number(),
    })

    const payload = await request.validate({ schema: makeDepositValidator })

    const user = auth.user!

    const requestPayload = {
      receiver: {
        '@assetType': 'holder',
        '@key': user?.holderKey,
      },
      value: payload.value,
    }

    const res = await makeDepositTx(requestPayload)

    if (res.type === 'success') {
      return response.status(200).json(res.value)
    }
    return response.status(500).json(res.error)
  }

  public async withdraw({ auth, request, response }: HttpContextContract) {
    const makeWithdrawValidator = schema.create({
      value: schema.number(),
    })

    const payload = await request.validate({ schema: makeWithdrawValidator })

    const user = auth.user!

    const requestPayload = {
      holder: {
        '@assetType': 'holder',
        '@key': user?.holderKey,
      },
      value: payload.value,
    }

    const res = await makeWithdrawTx(requestPayload)

    if (res.type === 'success') {
      return response.status(200).json(res.value)
    }
    return response.status(500).json(res.error)
  }

  public async purchase({ auth, request, response }: HttpContextContract) {
    const makeWithdrawValidator = schema.create({
      description: schema.string(),
      value: schema.number(),
    })

    const payload = await request.validate({ schema: makeWithdrawValidator })

    const user = auth.user!

    const requestPayload = {
      buyer: {
        '@assetType': 'holder',
        '@key': user?.holderKey,
      },
      description: payload.description,
      value: payload.value,
    }

    const res = await createPurchaseTx(requestPayload)

    if (res.type === 'success') {
      return response.status(200).json(res.value)
    }
    return response.status(500).json(res.error)
  }

  public async list({ response }: HttpContextContract) {
    const res = await listHoldersTx()

    if (res.type === 'success') {
      return response.status(200).json(res.value)
    }
    return response.status(500).json(res.error)
  }

  public async getHolder({ request, response }: HttpContextContract) {
    const getHolderByKeyValidator = schema.create({
      params: schema.object().members({
        key: schema.string(),
      }),
    })

    const payload = await request.validate({ schema: getHolderByKeyValidator })

    const requestPayload = {
      holder: {
        '@assetType': 'holder',
        '@key': payload.params.key,
      },
    }

    const res = await getHolderByKeyTx(requestPayload)

    if (res.type === 'success') {
      return response.status(200).json(res.value)
    }
    return response.status(500).json(res.error)
  }

  public async getDeposits({ request, response }: HttpContextContract) {
    const getDepositsByHolderKeyValidator = schema.create({
      params: schema.object().members({
        key: schema.string(),
      }),
    })

    const payload = await request.validate({ schema: getDepositsByHolderKeyValidator })

    const requestPayload = {
      holder: {
        '@assetType': 'holder',
        '@key': payload.params.key,
      },
    }

    const res = await getDepositsByHolderKeyTx(requestPayload)

    if (res.type === 'success') {
      return response.status(200).json(res.value)
    }
    return response.status(500).json(res.error)
  }

  public async getWithdrawals({ request, response }: HttpContextContract) {
    const getWithdrawalsByHolderKeyValidator = schema.create({
      params: schema.object().members({
        key: schema.string(),
      }),
    })

    const payload = await request.validate({ schema: getWithdrawalsByHolderKeyValidator })

    const requestPayload = {
      holder: {
        '@assetType': 'holder',
        '@key': payload.params.key,
      },
    }

    const res = await getWithdrawalsByHolderKeyTx(requestPayload)

    if (res.type === 'success') {
      return response.status(200).json(res.value)
    }
    return response.status(500).json(res.error)
  }

  public async getTransfers({ request, response }: HttpContextContract) {
    const getTransfersByHolderKeyValidator = schema.create({
      params: schema.object().members({
        key: schema.string(),
      }),
      sent: schema.boolean(),
    })

    const payload = await request.validate({ schema: getTransfersByHolderKeyValidator })

    const requestPayload = {
      holder: {
        '@assetType': 'holder',
        '@key': payload.params.key,
      },
      sent: payload.sent,
    }

    const res = await getTransfersByHolderKeyTx(requestPayload)

    if (res.type === 'success') {
      return response.status(200).json(res.value)
    }
    return response.status(500).json(res.error)
  }

  public async getPurchases({ request, response }: HttpContextContract) {
    const getPurchasesByHolderKeyValidator = schema.create({
      params: schema.object().members({
        key: schema.string(),
      }),
    })

    const payload = await request.validate({ schema: getPurchasesByHolderKeyValidator })

    const requestPayload = {
      holder: {
        '@assetType': 'holder',
        '@key': payload.params.key,
      },
    }

    const res = await getPurchasesByHolderKeyTx(requestPayload)

    if (res.type === 'success') {
      return response.status(200).json(res.value)
    }
    return response.status(500).json(res.error)
  }
}
