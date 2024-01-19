import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import TransportsRepository from '../../repositories/transports-repository'
import RepositoryFactory from '../../factories/repository-factory'

@Service('usecase.listAllTransports')
export default class ListAllTransports {
  transportsRepository: TransportsRepository

  constructor(
    @Inject('transportsRepositoryFactory')
    transportsRepositoryFactory: RepositoryFactory
  ) {
    this.transportsRepository =
      transportsRepositoryFactory.createTransportsRepository()
  }

  async execute(): Promise<any> {
    const transports = await this.transportsRepository.findAll()
    return transports
  }
}
