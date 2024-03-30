import * as Hapi from '@hapi/hapi'
import 'dotenv/config'
import hapiAuthJwt2 from 'hapi-auth-jwt2'

import Auth from '../domain/entities/Auth'

const createServer = async (): Promise<Hapi.Server> => {
  const server: Hapi.Server = Hapi.server({
    port: process.env.SERVER_PORT || 3000,
    host: process.env.SERVER_HOST || 'localhost',
  })

  const auth: Auth = new Auth()

  await server.register({
    plugin: hapiAuthJwt2,
  })

  server.auth.strategy('jwt', 'jwt', {
    key: process.env.SECRET_KEY,
    validate: async (decoded: any) => auth.validate(decoded),
    verifyOptions: { algorithms: ['HS256'], ignoreExpiration: false },
  })

  server.auth.default('jwt')

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

  await server.register([
    require('../interfaces/routes/transports'),
    require('../interfaces/routes/company'),
    require('../interfaces/routes/city'),
    require('../interfaces/routes/user'),
  ])

  return server
}

export default createServer
