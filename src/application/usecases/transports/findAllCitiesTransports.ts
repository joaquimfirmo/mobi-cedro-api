import { Service } from 'typedi'
import { InjectRepository } from '../../../infrastructure/di/decorators/inject-repository'
import ITransportsRepository from '../../repositories/transports-repository'
import TransportsRepository from '../../../infrastructure/repositories/transports-repository'

@Service()
export default class FindAllCitiesTransports {
  constructor(
    @InjectRepository(TransportsRepository)
    private readonly transportsRepository: ITransportsRepository
  ) {}

  async execute(limit: number, offset: number): Promise<any> {
    const citiesTransports =
      await this.transportsRepository.findAllCitiesTransports(limit, offset)

    if (citiesTransports.rows.length === 0) {
      return {
        data: [],
        message: 'Nenhum cidade encontrada com transportes cadastrados',
        status: 200,
      }
    }

    return {
      data: citiesTransports.rows,
      message: 'Cidades encontradas com transportes cadastrados',
      status: 200,
    }
  }
}
