import 'reflect-metadata'
import { Container } from 'typedi'
import DatabaseRepositoryFactory from './factories/database-repository-factory'
import Connection from './database/connection'

class Bosststrap {
  static connection: Connection

  static async run() {
    this.connection = new Connection()
    await this.connection.connect()

    const transportsRepositoryFactory = new DatabaseRepositoryFactory(
      this.connection
    )

    Container.set('transportsRepositoryFactory', transportsRepositoryFactory)
  }

  static async stop() {
    await this.connection.end()
  }
}

export default Bosststrap
