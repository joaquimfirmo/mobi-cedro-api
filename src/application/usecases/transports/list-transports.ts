import { Inject, Service } from 'typedi'
import TransportsRepository from '../../repositories/transports-repository'

@Service('usecase.listAllTransports')
export default class ListAllTransports {
  constructor(
    @Inject('repository-transports')
    readonly transportsRepository: TransportsRepository
  ) {}

  async execute(): Promise<any> {
    const transports = await this.transportsRepository.findAll()
    return transports
  }
}
