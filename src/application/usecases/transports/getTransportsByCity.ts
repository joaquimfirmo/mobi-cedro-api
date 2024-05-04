import { Service } from 'typedi'
import { InjectRepository } from '../../../infrastructure/di/decorators/inject-repository'
import ITransportsRepository from '../../repositories/transports-repository'
import TransportsRepository from '../../../infrastructure/repositories/transports-repository'

@Service()
export default class GetTransportsByCity {
  constructor(
    @InjectRepository(TransportsRepository)
    private readonly transportsRepository: ITransportsRepository
  ) {}

  async execute(cityId: string): Promise<any> {
    const transports = await this.transportsRepository.findByCity(cityId)

    if (transports.rowCount === 0) {
      return {
        data: [],
        message: 'Nenhum transporte encontrado para a cidade informada',
        status: 404,
      }
    }

    return {
      data: transports,
      message: 'Lista de transportes encontrada com sucesso',
      status: 200,
    }
  }
}
