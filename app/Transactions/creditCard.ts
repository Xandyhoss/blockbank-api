import { request } from 'App/Utils/api'

//CREATE NEW CREDIT CARD
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

//ACTIVATE CREDIT CARD AVAILABILITY
interface ActivateCreditCardPayload {
  owner: {
    '@assetType': string
    '@key': string
  }
}

interface ActivateCreditCardResponse {
  '@assetType': 'holder'
  '@key': string
  'cash': number
  'ccAvailable': boolean
  'document': string
  'name': string
}

/**
 * @param payload ActivateCreditCardPayload
 * @returns Returns a holder asset
 */
const activateCreditCardTx = async (payload: ActivateCreditCardPayload) => {
  const response = await request<ActivateCreditCardPayload, ActivateCreditCardResponse>(
    '/invoke/activateCreditCard',
    'post',
    payload
  )
  return response
}

export { createCreditCardTx, activateCreditCardTx }
