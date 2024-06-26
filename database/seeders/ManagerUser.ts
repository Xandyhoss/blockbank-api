import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { createManagerTx } from 'App/Transactions/manager'

export default class extends BaseSeeder {
  public async run() {
    const payload = {
      name: 'Administrador',
      document: '12312312312',
    }

    const response = await createManagerTx(payload)

    if (response.type === 'success') {
      await User.create({
        username: 'administrador',
        password: '12345678',
        accountType: 1,
        holderKey: response.value['@key'],
      })
    }
    if (response.type === 'error') {
      console.log(response.error)
    }
  }
}
