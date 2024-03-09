import { Inject, Service } from 'typedi'
import TransportsRepository from '../../repositories/transports-repository'

@Service('usecase.getTransportsByCity')
export default class GetTransportsByCity {
  constructor(
    @Inject('repository.transports')
    readonly transportsRepository: TransportsRepository
  ) {}

  async execute(cityId: string): Promise<any> {
    const transports = await this.transportsRepository.findByCity(cityId)
    if (transports.rowCount === 0) {
      return {
        message: 'Nenhum transporte encontrado para a cidade informada',
        transports: [],
        status: 404,
      }
    }

    if (transports instanceof Error) {
      return {
        message: transports.message,
        status: 500,
      }
    }

    return {
      message: 'Lista de transportes encontrada com sucesso',
      transports: transports.rows,
      status: 200,
    }
  }
}
