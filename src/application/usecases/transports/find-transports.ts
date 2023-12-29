import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import TransportsRepository from '../../repositories/transports-repository'
import RepositoryFactory from '../../factories/repository-factory'

@Service('usecase.findTransportsByCity')
export default class FindTransportsByCity {
  transportsRepository: TransportsRepository
  constructor(
    @Inject('transportsRepositoryFactory')
    transportsRepositoryFactory: RepositoryFactory
  ) {
    this.transportsRepository =
      transportsRepositoryFactory.createTransportsRepository()
  }

  async execute(city: string): Promise<any> {
    const transports = await this.transportsRepository.findByCity(city)
    return transports
  }
}
