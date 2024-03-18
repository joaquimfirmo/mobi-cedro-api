import * as Hapi from '@hapi/hapi'
import 'dotenv/config'

const createServer = async (): Promise<Hapi.Server> => {
  const server: Hapi.Server = Hapi.server({
    port: process.env.SERVER_PORT || 3000,
    host: process.env.SERVER_HOST || 'localhost',
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
