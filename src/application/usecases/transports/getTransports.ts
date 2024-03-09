import { Inject, Service } from 'typedi'
import TransportsRepository from '../../repositories/transports-repository'

@Service('usecase.getTransports')
export default class GetTransports {
  constructor(
    @Inject('repository.transports')
    readonly transportsRepository: TransportsRepository
  ) {}

  async execute(): Promise<any> {
    const transports = await this.transportsRepository.findAll()
    if (transports instanceof Error) {
      return {
        message: transports.message,
        status: 500,
      }
    }

    return {
      message: 'Transportes encontrados com sucesso',
      status: 200,
      transports: transports.rows,
    }
  }
}
