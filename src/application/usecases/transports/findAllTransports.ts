import { Service } from 'typedi'
import { InjectRepository } from '../../../infrastructure/di/decorators/inject-repository'
import ITransportsRepository from '../../repositories/transports-repository'
import TransportsRepository from '../../../infrastructure/repositories/transports-repository'

@Service()
export default class FindAllTransports {
  constructor(
    @InjectRepository(TransportsRepository)
    private readonly transportsRepository: ITransportsRepository
  ) {}

  async execute(limit: number, offset: number): Promise<any> {
    const transports = await this.transportsRepository.findAll(limit, offset)

    return {
      data: transports,
      message:
        transports.length > 0
          ? 'Transportes encontrados com sucesso'
          : 'Nenhum transporte encontrado',
      status: 200,
    }
  }
}
