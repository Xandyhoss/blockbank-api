import api from 'App/Utils/api'

const healthCheckTx = async () => {
  try {
    await api.get('/query/healthCheck')
    return { status: 'ok' }
  } catch (error) {
    return { status: 'error', error }
  }
}

export { healthCheckTx }
