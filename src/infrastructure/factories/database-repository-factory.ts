import RepositoryFactory from '../../application/factories/repository-factory'
import Connection from '../../infrastructure/database/connection'
import TransportsRepository from '../repositories/transports-repository'
import CompanyRepository from '../repositories/company-repository'

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(private readonly connection: Connection) {}

  createTransportsRepository(): TransportsRepository {
    return new TransportsRepository(this.connection)
  }

  createCompanyRepository(): CompanyRepository {
    return new CompanyRepository(this.connection)
  }
}
