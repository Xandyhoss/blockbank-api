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

// LIST MANAGERS
type ListManagersResponse = Managers[]

interface Managers {
  '@assetType': 'manager'
  '@key': string
  'document': string
  'name': string
}

/**
 * List Managers
 * @returns Returns a manager asset array
 */
const listManagersTx = async () => {
  const response = await request<any, ListManagersResponse>('/query/listManagers', 'get')
  return response
}

export { createManagerTx, listManagersTx }
