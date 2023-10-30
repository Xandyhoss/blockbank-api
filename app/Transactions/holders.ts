import { request } from 'App/Utils/api'

//CREATE NEW HOLDER

interface CreateHolderPayload {
  name: string
  document: string
  cash?: number
  ccAvailable?: boolean
}

interface CreateHolderResponse {
  '@assetType': 'holder'
  '@key': string
  'cash': number
  'ccAvailable': boolean
  'document': string
  'name': string
}

/**
 * @param payload CreateHolderPayload
 * @returns Returns a holder asset
 */
const createHolderTx = async (payload: CreateHolderPayload) => {
  const response = await request<CreateHolderPayload, CreateHolderResponse>(
    '/invoke/createNewHolder',
    'post',
    payload
  )
  return response
}

//CREATE NEW TRASNFERENCY

interface CreateTransferencyPayload {
  sender: {
    '@assetType': string
    '@key': string
  }
  receiver: {
    '@assetType': string
    '@key': string
  }
  value: number
}

interface CreateTrasnferencyResponse {
  '@assetType': 'transferency'
  '@key': string
  'receiver': {
    '@assetType': 'holder'
    '@key': string
  }
  'sender': {
    '@assetType': 'holder'
    '@key': string
  }
  'value': number
}

/**
 * @param payload CreateTransferencyPayload
 * @returns Returns a transferency asset
 */
const createTransferencyTx = async (payload: CreateTransferencyPayload) => {
  const response = await request<CreateTransferencyPayload, CreateTrasnferencyResponse>(
    '/invoke/createNewTransferency',
    'post',
    payload
  )
  return response
}

//MAKE DEPOSIT

interface MakeDepositPayload {
  value: number
}

interface MakeDepositResponse {
  '@assetType': 'holder'
  '@key': string
  'cash': number
  'ccAvailable': boolean
  'document': string
  'name': string
}

/**
 * @param payload MakeDepositPayload
 * @returns Returns a holder asset
 */
const makeDepositTx = async (payload: MakeDepositPayload) => {
  const response = await request<MakeDepositPayload, MakeDepositResponse>(
    '/invoke/makeDeposit',
    'post',
    payload
  )
  return response
}

//MAKE WITHDRAWAL

interface MakeWithdrawPayload {
  value: number
}

interface MakeWithdrawResponse {
  '@assetType': 'holder'
  '@key': string
  'cash': number
  'ccAvailable': boolean
  'document': string
  'name': string
}

/**
 * @param payload MakeWithdrawPayload
 * @returns Returns a holder asset
 */
const makeWithdrawTx = async (payload: MakeWithdrawPayload) => {
  const response = await request<MakeWithdrawPayload, MakeWithdrawResponse>(
    '/invoke/makeWithdrawal',
    'post',
    payload
  )
  return response
}

export { createHolderTx, createTransferencyTx, makeDepositTx, makeWithdrawTx }