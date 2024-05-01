import { Container, Service, Inject } from 'typedi'
import RepositoryFactory from '../../application/factories/repository-factory'
import Connection from '../../infrastructure/database/connection'
import TransportsRepository from '../repositories/transports-repository'
import CompanyRepository from '../repositories/company-repository'
import UserRepository from '../repositories/user-repository'
import ICache from '../../application/cache/cache'
import { CacheManagerToken } from '../cacheManager'

type Repositories = {
  name: string
  repository: any
}

@Service()
export default class DataBaseRepositoryFactory implements RepositoryFactory {
  constructor(
    private connection: Connection,
    @Inject(CacheManagerToken) private cache: ICache
  ) {}

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
