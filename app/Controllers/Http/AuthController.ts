import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    const { username, password } = await request.all()

    const isLogged = await auth.check()

    if (isLogged) {
      return response.json({
        message: 'Already logged',
      })
    }

    const token = await auth.attempt(username, password, {
      expiresIn: '7 days',
    })

    response.encryptedCookie('token', token, { httpOnly: true })

    return token
  }
}
