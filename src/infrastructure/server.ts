import * as Hapi from '@hapi/hapi'
import 'dotenv/config'
import Container from 'typedi'
import Auth from '../domain/entities/auth'
import Connection from './database/connection'

const configRoutes = async (server: Hapi.Server): Promise<void> => {
  await server.register([
    require('../interfaces/routes/transports'),
    require('../interfaces/routes/company'),
    require('../interfaces/routes/user'),
    require('../interfaces/routes/locations'),
  ])
  return
}

const configAuth = async (server: Hapi.Server): Promise<void> => {
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

  return
}

const createServer = async (): Promise<Hapi.Server> => {
  const server: Hapi.Server = Hapi.server({
    port: process.env.SERVER_PORT || 3000,
    host: process.env.SERVER_HOST || 'localhost',
  })

  //start connection with database
  const connection = Container.get(Connection)
  await connection.connect()

  await configAuth(server)

  await configRoutes(server)

  return server
}

export default createServer
