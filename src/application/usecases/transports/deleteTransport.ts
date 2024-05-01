import { Service } from 'typedi'
import { InjectRepository } from '../../../infrastructure/di/decorators/inject-repository'
import ITransportsRepository from '../../repositories/transports-repository'
import TransportsRepository from '../../../infrastructure/repositories/transports-repository'

@Service()
export default class DeleteTransport {
  constructor(
    @InjectRepository(TransportsRepository)
    readonly transportsRepository: ITransportsRepository
  ) {}

  async execute(id: string): Promise<any> {
    const transportExists = await this.transportsRepository.findById(id)

    if (transportExists.rowCount === 0) {
      return {
        data: [],
        message: 'Transporte para exclusão não encontrado',
        status: 404,
      }
    }

    await this.transportsRepository.delete(id)

    return {
      data: id,
      message: 'Transporte excluído com sucesso!',
      status: 200,
    }
  }
}
