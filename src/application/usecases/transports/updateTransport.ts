import { Inject, Service } from 'typedi'
import ITransportsRepository from '../../repositories/transports-repository'

@Service()
export default class UpdateTransport {
  constructor(
    @Inject('repository.transports')
    private readonly transportsRepository: ITransportsRepository
  ) {}

  async execute(id: string, data: any): Promise<any> {
    const transport = await this.transportsRepository.findById(id)

    if (transport.rowCount === 0) {
      return {
        data: [],
        message: 'Transporte não encontrado',
        status: 404,
      }
    }

    const result = await this.transportsRepository.update(id, data)

    return {
      data: result,
      message: 'Transporte atualizado com sucesso',
      status: 200,
    }
  }
}
