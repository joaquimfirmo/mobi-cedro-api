import { Inject, Service } from 'typedi'
import TransportsRepository from '../../repositories/transports-repository'

@Service()
export default class GetTransportsByCity {
  constructor(
    @Inject('repository.transports')
    readonly transportsRepository: TransportsRepository
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
