import TransportsRepository from '../../repositories/transports-repository'
import RepositoryFactory from '../../factories/repository-factory'
export default class ListAllTransports {
  transportsRepository: TransportsRepository

  constructor(private readonly transportsRepositoryFactory: RepositoryFactory) {
    this.transportsRepository =
      this.transportsRepositoryFactory.createTransportsRepository()
  }

  async execute(): Promise<any> {
    const transports = await this.transportsRepository.list()
    return transports
  }
}
