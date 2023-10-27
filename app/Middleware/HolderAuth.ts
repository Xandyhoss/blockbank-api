import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ManagerAuth {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const isLogged = await auth.check()

    if (!isLogged) {
      return response.unauthorized({ message: 'Unauthorized' })
    }

    const user = auth.user

    if (user?.accountType !== 0) {
      return response.unauthorized({ message: 'Unauthorized' })
    }
    await next()
  }
}
