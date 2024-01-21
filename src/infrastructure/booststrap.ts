import 'reflect-metadata'
import { Container } from 'typedi'
import DataBaseRepositoryFactory from './factories/database-repository-factory'
import Connection from './database/connection'

class Bosststrap {
  static connection: Connection

  static async run() {
    this.connection = new Connection()

    await this.connection.connect()

    const dataBaseRepositoryFactory = new DataBaseRepositoryFactory(
      this.connection
    )

    const allRepositories = dataBaseRepositoryFactory.createAllRepositories()

    allRepositories.forEach((repo: any) => {
      Container.set(repo.name, repo.repository)
    })
  }

  static async stop() {
    await this.connection.end()
  }
}

export default Bosststrap
