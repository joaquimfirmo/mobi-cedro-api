import { Container } from 'typedi'
import RepositoryFactory from '../../application/factories/repository-factory'
import Connection from '../../infrastructure/database/connection'
import TransportsRepository from '../repositories/transports-repository'
import CompanyRepository from '../repositories/company-repository'
import CityRepository from '../repositories/city-repository'
import UserRepository from '../repositories/user-repository'

type Repositories = {
  name: string
  repository: any
}
export default class DataBaseRepositoryFactory implements RepositoryFactory {
  connection: Connection = new Connection()

  async createAllRepositories(): Promise<void> {
    await this.connection.connect()

    const repositories: Repositories[] = [
      {
        name: 'repository.transports',
        repository: new TransportsRepository(this.connection),
      },
      {
        name: 'repository.company',
        repository: new CompanyRepository(this.connection),
      },
      {
        name: 'repository.city',
        repository: new CityRepository(this.connection),
      },
      {
        name: 'repository.user',
        repository: new UserRepository(this.connection),
      },
    ]

    this.injectRepositories(repositories)
  }

  injectRepositories(repositories: Repositories[]): void {
    repositories.forEach((repository) => {
      Container.set(repository.name, repository.repository)
    })
  }
}
