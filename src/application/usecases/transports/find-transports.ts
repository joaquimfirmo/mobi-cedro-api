import TransportsRepository from '../../repositories/transports-repository'
import RepositoryFactory from '../../factories/repository-factory'

export default class findTransportsByCity {
  transportsRepository: TransportsRepository
  constructor(private readonly transportsRepositoryFactory: RepositoryFactory) {
    this.transportsRepository =
      this.transportsRepositoryFactory.createTransportsRepository()
  }

  async execute(city: string): Promise<any> {
    const transports = await this.transportsRepository.findByCity(city)
    return transports
  }
}
