'use strict'
import 'reflect-metadata'
import createServer from './infrastructure/server'

async function booststrap() {
  try {
    const server = await createServer()

    await server.start()

    console.log(`Listening on ${server.settings.host}:${server.settings.port}`)
  } catch (err) {
    console.error('bootstrap error')
    console.error(err)
    process.exit(1)
  }
}

booststrap()
