import { Inject, Service } from 'typedi'
import CityRepository from '../../repositories/city-repository'

@Service()
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
        data: [],
      }
    }

    const result = await this.cityRepository.update(id, city)

    return {
      message: 'Cidade atualizada com sucesso',
      status: 200,
      data: result.rows[0],
    }
  }
}
