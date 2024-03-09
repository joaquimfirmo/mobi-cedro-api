import { Inject, Service } from 'typedi'
import CityRepository from '../../repositories/city-repository'

@Service('usecase.deleteCity')
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

    const result = await this.cityRepository.delete(id)

    if (result instanceof Error) {
      return {
        message: result.message,
        status: 500,
      }
    }

    return {
      message: 'Cidade excluída com sucesso!',
      status: 200,
      data: id,
    }
  }
}
