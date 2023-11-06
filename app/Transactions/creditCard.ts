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

//CREATE A CREDIT CARD PURCHASE
interface CreateCreditCardPurchasePayload {
  creditCard: {
    '@assetType': string
    '@key': string
  }
  description: string
  value: number
}

interface CreateCreditCardPurchaseResponse {
  '@assetType': 'creditCardPurchase'
  '@key': string
  'description': number
  'value': number
  'creditCard': {
    '@assetType': 'creditCard'
    '@key': string
  }
}

/**
 * Creates a credit card purchase
 * @param payload CreateCreditCardPurchasePayload
 * @returns Return a credit card purchase asset
 */
const createCreditCardPurchaseTx = async (payload: CreateCreditCardPurchasePayload) => {
  const response = await request<CreateCreditCardPurchasePayload, CreateCreditCardPurchaseResponse>(
    '/invoke/createNewCreditCardPurchase',
    'post',
    payload
  )
  return response
}

//PAY CREDIT CARD PURCHASE INVOICE
interface PayCreditCardInvoicePayload {
  creditCard: {
    '@assetType': string
    '@key': string
  }
  valueToPay: number
}

interface PayCreditCardInvoiceResponse {
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
 * Pay a credit card invoice
 * @param payload PayCreditCardInvoicePayload
 * @returns Return a credit card asset
 */
const payCreditCardInvoiceTx = async (payload: PayCreditCardInvoicePayload) => {
  const response = await request<PayCreditCardInvoicePayload, PayCreditCardInvoiceResponse>(
    '/invoke/payCreditCardInvoice',
    'post',
    payload
  )
  return response
}

export {
  createCreditCardTx,
  activateCreditCardTx,
  updateCreditCardLimitTx,
  updateCreditCardNameTx,
  createCreditCardPurchaseTx,
  payCreditCardInvoiceTx,
}
