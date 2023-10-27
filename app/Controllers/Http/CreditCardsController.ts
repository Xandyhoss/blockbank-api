import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { activateCreditCardTx, createCreditCardTx } from 'App/Transactions/creditCard'

export default class CreaditCardsController {
  public async create({ auth, request, response }: HttpContextContract) {
    const createCreditCardValidator = schema.create({
      creditCardName: schema.string([]),
    })

    const user = auth.user!

    const owner = {
      '@assetType': 'holder',
      '@key': user.holderKey,
    }

    const payload = await request.validate({ schema: createCreditCardValidator })
    Object.assign(payload, { owner: owner })

    const res = await createCreditCardTx(payload)

    if (res.type === 'success') {
      return response.status(200).json(res.value)
    }
    return response.status(500).json(res.error)
  }

  public async activate({ request, response }: HttpContextContract) {
    const updateCreditCardValidator = schema.create({
      holderKey: schema.string(),
    })

    const payload = await request.validate({ schema: updateCreditCardValidator })

    const requestPayload = {
      owner: {
        '@assetType': 'holder',
        '@key': payload.holderKey,
      },
    }

    const res = await activateCreditCardTx(requestPayload)

    if (res.type === 'success') {
      return response.status(200).json(res.value)
    }
    return response.status(500).json(res.error)
  }
}
