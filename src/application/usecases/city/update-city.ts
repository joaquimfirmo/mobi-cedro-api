import { Inject, Service } from 'typedi'
import CityRepository from '../../repositories/city-repository'

@Service('usecase.updateCity')
export default class UpdateCity {
  constructor(
    @Inject('repository.city')
    readonly cityRepository: CityRepository
  ) {}

  async execute(id: string, city: any): Promise<any> {
    const cityExists = await this.cityRepository.findById(id)
    if (cityExists.rowCount === 0) {
      return {
        message: 'Cidade não encontrada',
        status: 404,
        city: [],
      }
    }

    const result = await this.cityRepository.update(id, city)

    if (result instanceof Error) {
      return {
        message: result.message,
        status: 500,
        city: [],
      }
    }

    return {
      message: 'Cidade atualizada com sucesso',
      status: 200,
      cityUpdated: result.rows[0],
    }
  }
}
