import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CheckToken {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    const token = await request.encryptedCookie('token')

    if (token?.token) {
      request.headers().authorization = `Bearer ${token.token}`
    }

    await next()
  }
}
