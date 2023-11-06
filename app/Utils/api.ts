import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

interface CCErrorResponse {
  error: string
  status: number
}

interface CCError {
  type: 'error'
  error: CCErrorResponse
}

interface CCResponse<T> {
  type: 'success'
  value: T
}

type Result<T> = CCResponse<T> | CCError

const api = axios.create({
  baseURL: Env.get('CCAPI_HOST'),
})

export const request = async <P, R>(
  url: string,
  method: string,
  payload?: P
): Promise<Result<R>> => {
  try {
    const response = await api.request({ method, url, data: payload })
    return { type: 'success', value: response.data }
  } catch (error) {
    return { type: 'error', error: error.response.data as CCErrorResponse }
  }
}

export default api
