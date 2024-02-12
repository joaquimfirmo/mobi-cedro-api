import { Inject, Service } from 'typedi'
import TransportsRepository from '../../repositories/transports-repository'

@Service('usecase.findTransportsByCity')
export default class FindTransportsByCity {
  constructor(
    @Inject('repository.transports')
    readonly transportsRepository: TransportsRepository
  ) {}

  async execute(cityId: string): Promise<any> {
    try {
      const transports = await this.transportsRepository.findByCity(cityId)
      if (transports.rowCount === 0) {
        return {
          message: 'Nenhum transporte encontrado para a cidade informada',
          transports: [],
          status: 404,
        }
      }
      return {
        message: 'Lista de transportes encontrada com sucesso',
        transports: transports.rows,
        status: 200,
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'Erro ao buscar transportes',
        transports: null,
        status: 500,
      }
    }
  }
}
