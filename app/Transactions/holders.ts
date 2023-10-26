import { request } from 'App/Utils/api'

interface CreateHolderPayload {
  name: string
  document: string
  cash: number
  ccAvailable: boolean
}

interface CreateHolderResponse {
  '@assetType': 'holder'
  '@key': string
  'cash': number
  'ccAvailable': boolean
  'document': string
  'name': string
}

const createHolderTx = async (payload: CreateHolderPayload) => {
  const response = await request<CreateHolderPayload, CreateHolderResponse>(
    '/invoke/createNewHolder',
    'post',
    payload
  )
  return response
}

export { createHolderTx }
