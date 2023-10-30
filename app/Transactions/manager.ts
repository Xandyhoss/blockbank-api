//CREATE NEW MANAGER

import { request } from 'App/Utils/api'

interface CreateManagerPayload {
  name: string
  document: string
}

interface CreateManagerResponse {
  '@assetType': 'manager'
  '@key': string
  'document': string
  'name': string
}

/**
 * @param payload CreateManagerPayload
 * @returns Returns a manager asset
 */
const createManagerTx = async (payload: CreateManagerPayload) => {
  const response = await request<CreateManagerPayload, CreateManagerResponse>(
    '/invoke/createNewManager',
    'post',
    payload
  )
  return response
}

export { createManagerTx }
