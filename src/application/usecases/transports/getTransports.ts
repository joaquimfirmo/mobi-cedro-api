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

    return {
      data: transports,
      message: 'Transportes encontrados com sucesso',
      status: 200,
    }
  }
}
