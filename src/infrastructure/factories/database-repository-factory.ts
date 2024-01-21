import RepositoryFactory from '../../application/factories/repository-factory'
import Connection from '../../infrastructure/database/connection'
import TransportsRepository from '../repositories/transports-repository'
import CompanyRepository from '../repositories/company-repository'

export default class DataBaseRepositoryFactory implements RepositoryFactory {
  constructor(private readonly connection: Connection) {}

  createAllRepositories(): Array<{ name: string; repository: any }> {
    return [
      {
        name: 'repository.transports',
        repository: new TransportsRepository(this.connection),
      },
      {
        name: 'repository.company',
        repository: new CompanyRepository(this.connection),
      },
    ]
  }
}
