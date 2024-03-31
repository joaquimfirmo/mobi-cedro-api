import * as Hapi from '@hapi/hapi'
import 'dotenv/config'
import Auth from '../../domain/entities/Auth'

export default class HapiFactory {
  async createServer(): Promise<Hapi.Server> {
    const server: Hapi.Server = Hapi.server({
      port: process.env.SERVER_PORT || 3000,
      host: process.env.SERVER_HOST || 'localhost',
    })

    const authentication: Auth = new Auth()

    //set plugin autorization
    await server.register({
      plugin: require('hapi-auth-jwt2'),
    })

    //config strategy jwt token
    server.auth.strategy('jwt', 'jwt', {
      key: process.env.SECRET_KEY,
      validate: async (decoded: any) => authentication.validate(decoded),
      verifyOptions: { algorithms: ['HS256'], ignoreExpiration: false },
    })

    server.auth.default('jwt')

    //config autorization
    await server.register({
      plugin: require('hapi-rbac'),
      options: {
        policy: {
          target: [
            { 'credentials:group': 'SUPER_ADMIN' },
            { 'credentials:group': 'ADMIN' },
          ],
          apply: 'deny-overrides',
          effect: 'permit',
        },
      },
    })

    //config routes
    await server.register([
      require('../../interfaces/routes/transports'),
      require('../../interfaces/routes/company'),
      require('../../interfaces/routes/city'),
      require('../../interfaces/routes/user'),
    ])

    return server
  }
}
