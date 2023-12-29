'use strict'
import 'reflect-metadata'
import boostrap from './infrastructure/booststrap'
import createServer from './infrastructure/server'
import 'dotenv/config'

export const initServer = async (): Promise<void> => {
  await boostrap()

  const server = await createServer()

  await server.start()

  console.log(`Listening on ${server.settings.host}:${server.settings.port}`)
}

process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection')
  console.error(err)
  process.exit(1)
})
