import { request } from 'App/Utils/api'

interface CreateCreditCardPayload {
  creditCardName: string
}

interface CreateCreditCardResponse {
  '@assetType': 'creditCard'
  '@key': string
  'creditCardName': string
  'limit': number
  'limitUsed': number
  'number': string
  'owner': {
    '@assetType': 'holder'
    '@key': string
  }
}

/**
 * @param payload CreateCreditCardPayload
 * @returns Returns a credit card asset
 */
const createCreditCardTx = async (payload: CreateCreditCardPayload) => {
  const response = await request<CreateCreditCardPayload, CreateCreditCardResponse>(
    '/invoke/createNewCreditCard',
    'post',
    payload
  )
  return response
}

export { createCreditCardTx }
