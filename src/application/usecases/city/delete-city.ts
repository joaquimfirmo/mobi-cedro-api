import { Inject, Service } from 'typedi'
import CityRepository from '../../repositories/city-repository'

@Service()
export default class DeleteCity {
  constructor(
    @Inject('repository.city')
    readonly cityRepository: CityRepository
  ) {}

  async execute(id: string): Promise<any> {
    const cityExists = await this.cityRepository.findById(id)

    if (cityExists.rowCount === 0) {
      return {
        message: 'Cidade para exclusão não encontrada',
        status: 404,
        data: [],
      }
    }

    await this.cityRepository.delete(id)

    return {
      data: id,
      message: 'Cidade excluída com sucesso!',
      status: 200,
    }
  }
}
