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
 * Creates a new credit card to a holder
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
 * Activate the credit card function to a holder account
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

//UPDATE CREDIT CARD LIMIT
interface UpdateCreditCardLimitPayload {
  creditCard: {
    '@assetType': string
    '@key': string
  }
  value: number
}

interface UpdateCreditCardLimitResponse {
  '@assetType': 'creditCard'
  '@key': string
  'limit': number
  'limitUsed': number
  'number': string
  'creditCardName': string
}

/**
 * Updates a credit card limit
 * @param payload UpdateCreditCardLimitPayload
 * @returns Returns a creditCard asset
 */
const updateCreditCardLimitTx = async (payload: UpdateCreditCardLimitPayload) => {
  const response = await request<UpdateCreditCardLimitPayload, UpdateCreditCardLimitResponse>(
    '/invoke/updateCreditCardLimit',
    'post',
    payload
  )
  return response
}

//UPDATE CREDIT CARD NAME
interface UpdateCreditCardNamePayload {
  creditCard: {
    '@assetType': string
    '@key': string
  }
  name: string
}

interface UpdateCreditCardNameResponse {
  '@assetType': 'creditCard'
  '@key': string
  'limit': number
  'limitUsed': number
  'number': string
  'creditCardName': string
}

/**
 * Updates a credit card name
 * @param payload UpdateCreditCardNamePayload
 * @returns Returns a creditCard asset
 */
const updateCreditCardNameTx = async (payload: UpdateCreditCardNamePayload) => {
  const response = await request<UpdateCreditCardNamePayload, UpdateCreditCardNameResponse>(
    '/invoke/updateCreditCardName',
    'post',
    payload
  )
  return response
}

export { createCreditCardTx, activateCreditCardTx, updateCreditCardLimitTx, updateCreditCardNameTx }
