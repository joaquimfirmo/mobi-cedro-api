import { Inject, Service } from 'typedi'
import ITransportsRepository from '../../repositories/transports-repository'

@Service('usecase.updateTransport')
export default class UpdateTransport {
  constructor(
    @Inject('repository.transports')
    private readonly transportsRepository: ITransportsRepository
  ) {}

  async execute(id: string, data: any): Promise<any> {
    try {
      const transport = await this.transportsRepository.findById(id)

      if (transport.rowCount === 0) {
        return {
          message: 'Transporte não encontrado',
          status: 404,
          data: [],
        }
      }

      const result = await this.transportsRepository.update(id, data)

      return {
        message: 'Transporte atualizado com sucesso',
        status: 200,
        data: result,
      }
    } catch (err) {
      console.log(err)
      return {
        message: 'Erro ao atualizar o transporte',
        status: 500,
        data: null,
      }
    }
  }
}
