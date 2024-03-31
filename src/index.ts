'use strict'
import 'reflect-metadata'
import HapiFactory from '../src/infrastructure/factories/hapi-factory'
import DataBaseRepositoryFactory from '../src/infrastructure/factories/database-repository-factory'

async function booststrap() {
  try {
    const hapiFactory = new HapiFactory()
    const databaseRepositoryFactory = new DataBaseRepositoryFactory()

    await databaseRepositoryFactory.createAllRepositories()

    const server = await hapiFactory.createServer()

    await server.start()

    console.log(`Listening on ${server.settings.host}:${server.settings.port}`)
  } catch (err) {
    console.error('bootstrap error')
    console.error(err)
    process.exit(1)
  }
}

booststrap()
