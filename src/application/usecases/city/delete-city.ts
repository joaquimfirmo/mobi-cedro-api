import { Service, Inject } from 'typedi'
import { cityRepository } from '../../../infrastructure/repositories/city-repository'
import ICityRepository from '../../../application/repositories/city-repository'

@Service()
export default class DeleteCity {
  constructor(
    @Inject(cityRepository)
    readonly repository: ICityRepository
  ) {}

  async execute(id: string): Promise<any> {
    const cityExists = await this.repository.findById(id)

    if (cityExists.rowCount === 0) {
      return {
        message: 'Cidade para exclusão não encontrada',
        status: 404,
        data: [],
      }
    }

    await this.repository.delete(id)

    return {
      data: id,
      message: 'Cidade excluída com sucesso!',
      status: 200,
    }
  }
}
