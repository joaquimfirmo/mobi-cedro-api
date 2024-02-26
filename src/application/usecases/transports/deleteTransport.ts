import { Inject, Service } from 'typedi'
import TransportsRepository from '../../repositories/transports-repository'

@Service('usecase.deleteTransport')
export default class DeleteTransport {
  constructor(
    @Inject('repository.transports')
    readonly transportsRepository: TransportsRepository
  ) {}

  async execute(id: string): Promise<any> {
    try {
      const transportExists = await this.transportsRepository.findById(id)
      if (transportExists.rowCount === 0) {
        return {
          message: 'Transporte para exclusão não encontrado',
          status: 404,
          data: [],
        }
      }

      await this.transportsRepository.delete(id)

      return {
        message: 'Transporte excluído com sucesso!',
        status: 200,
        data: id,
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'Erro ao excluir transporte',
        status: 500,
        data: [],
      }
    }
  }
}
