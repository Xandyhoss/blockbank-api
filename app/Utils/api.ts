import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

const api = axios.create({
  baseURL: Env.get('CCAPI_HOST'),
})

export default api
