import 'reflect-metadata'
import { Container } from 'typedi'
import DatabaseRepositoryFactory from './factories/database-repository-factory'
import Connection from './database/connection'

const booststrap = async () => {
  const connection = new Connection()
  await connection.connect()

  const transportsRepositoryFactory = new DatabaseRepositoryFactory(connection)

  Container.set('transportsRepositoryFactory', transportsRepositoryFactory)
}

export default booststrap
