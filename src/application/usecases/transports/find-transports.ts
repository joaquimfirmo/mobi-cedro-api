import { Inject, Service } from 'typedi'
import TransportsRepository from '../../repositories/transports-repository'

@Service('usecase.findTransportsByCity')
export default class FindTransportsByCity {
  constructor(
    @Inject('repository-transports')
    readonly transportsRepository: TransportsRepository
  ) {}

  async execute(city: string): Promise<any> {
    const transports = await this.transportsRepository.findByCity(city)
    return transports
  }
}
