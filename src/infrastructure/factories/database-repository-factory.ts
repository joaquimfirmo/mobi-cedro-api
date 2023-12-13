import Connection from '../../infrastructure/database/connection'
import TransportsRepository from '../repositories/transports-repository'

export default class DatabaseRepositoryFactory {
  constructor(private readonly connection: Connection) {}

  createTransportsRepository(): TransportsRepository {
    return new TransportsRepository(this.connection)
  }
}
