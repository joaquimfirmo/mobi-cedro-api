'use strict'
import * as Hapi from '@hapi/hapi'
import { transportsRoutes } from './interfaces/routes/transports '
import 'dotenv/config'

export const initServer = async (): Promise<void> => {
  const server: Hapi.Server = Hapi.server({
    port: process.env.SERVER_PORT || 3000,
    host: process.env.SERVER_HOST || 'localhost',
  })
  server.route(transportsRoutes)
  console.log(`Listening on ${server.settings.host}:${server.settings.port}`)
  return server.start()
}

process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection')
  console.error(err)
  process.exit(1)
})
