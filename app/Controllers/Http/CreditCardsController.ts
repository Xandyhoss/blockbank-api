import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import {
  activateCreditCardTx,
  createCreditCardPurchaseTx,
  createCreditCardTx,
  getCreditCardByHolderKeyTx,
  getCreditCardPaymentsByCreditCardKeyTx,
  getCreditCardPurchasesByCreditCardKeyTx,
  payCreditCardInvoiceTx,
  updateCreditCardLimitTx,
  updateCreditCardNameTx,
} from 'App/Transactions/creditCard'

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

  public async updateLimit({ request, response }: HttpContextContract) {
    const updateCreditCardLimitValidator = schema.create({
      creditCardKey: schema.string([]),
      value: schema.number(),
    })

    const payload = await request.validate({ schema: updateCreditCardLimitValidator })

    const requestPayload = {
      creditCard: {
        '@assetType': 'creditCard',
        '@key': payload.creditCardKey,
      },
      value: payload.value,
    }

    const res = await updateCreditCardLimitTx(requestPayload)

    if (res.type === 'success') {
      return response.status(200).json(res.value)
    }
    return response.status(500).json(res.error)
  }

  public async updateName({ request, response }: HttpContextContract) {
    const updateCreditCardLimitValidator = schema.create({
      creditCardKey: schema.string([]),
      name: schema.string(),
    })

    const payload = await request.validate({ schema: updateCreditCardLimitValidator })

    const requestPayload = {
      creditCard: {
        '@assetType': 'creditCard',
        '@key': payload.creditCardKey,
      },
      name: payload.name,
    }

    const res = await updateCreditCardNameTx(requestPayload)

    if (res.type === 'success') {
      return response.status(200).json(res.value)
    }
    return response.status(500).json(res.error)
  }

  public async createPurchase({ request, response }: HttpContextContract) {
    const createCreditCardPurchaseValidator = schema.create({
      creditCardKey: schema.string([]),
      description: schema.string(),
      value: schema.number(),
    })

    const payload = await request.validate({ schema: createCreditCardPurchaseValidator })

    const requestPayload = {
      creditCard: {
        '@assetType': 'creditCard',
        '@key': payload.creditCardKey,
      },
      description: payload.description,
      value: payload.value,
    }

    const res = await createCreditCardPurchaseTx(requestPayload)

    if (res.type === 'success') {
      return response.status(200).json(res.value)
    }
    return response.status(500).json(res.error)
  }

  public async payInvoice({ request, response }: HttpContextContract) {
    const payCreditCardInvoiceValidator = schema.create({
      creditCardKey: schema.string([]),
      value: schema.number(),
    })

    const payload = await request.validate({ schema: payCreditCardInvoiceValidator })

    const requestPayload = {
      creditCard: {
        '@assetType': 'creditCard',
        '@key': payload.creditCardKey,
      },
      valueToPay: payload.value,
    }

    const res = await payCreditCardInvoiceTx(requestPayload)

    if (res.type === 'success') {
      return response.status(200).json(res.value)
    }
    return response.status(500).json(res.error)
  }

  public async getCreditCard({ request, response }: HttpContextContract) {
    const getCreditCardByHolderKeyValidator = schema.create({
      params: schema.object().members({
        key: schema.string(),
      }),
    })

    const payload = await request.validate({ schema: getCreditCardByHolderKeyValidator })

    const requestPayload = {
      holder: {
        '@assetType': 'holder',
        '@key': payload.params.key,
      },
    }

    const res = await getCreditCardByHolderKeyTx(requestPayload)

    if (res.type === 'success') {
      return response.status(200).json(res.value)
    }
    return response.status(500).json(res.error)
  }

  public async getPurchases({ request, response }: HttpContextContract) {
    const getCreditCardPurchasesByCreditCardKeyValidator = schema.create({
      params: schema.object().members({
        creditCard: schema.string(),
      }),
    })

    const payload = await request.validate({
      schema: getCreditCardPurchasesByCreditCardKeyValidator,
    })

    const requestPayload = {
      creditCard: {
        '@assetType': 'creditCard',
        '@key': payload.params.creditCard,
      },
    }

    const res = await getCreditCardPurchasesByCreditCardKeyTx(requestPayload)

    if (res.type === 'success') {
      return response.status(200).json(res.value)
    }
    return response.status(500).json(res.error)
  }

  public async getPayments({ request, response }: HttpContextContract) {
    const getCreditCardPaymentsByCreditCardKeyValidator = schema.create({
      params: schema.object().members({
        creditCard: schema.string(),
      }),
    })

    const payload = await request.validate({
      schema: getCreditCardPaymentsByCreditCardKeyValidator,
    })

    const requestPayload = {
      creditCard: {
        '@assetType': 'creditCard',
        '@key': payload.params.creditCard,
      },
    }

    const res = await getCreditCardPaymentsByCreditCardKeyTx(requestPayload)

    if (res.type === 'success') {
      return response.status(200).json(res.value)
    }
    return response.status(500).json(res.error)
  }
}
