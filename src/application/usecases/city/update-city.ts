import { Inject, Service } from 'typedi'
import CityRepository from '../../repositories/city-repository'

@Service('usecase.updateCity')
export default class UpdateCity {
  constructor(
    @Inject('repository.city')
    readonly cityRepository: CityRepository
  ) {}

  async execute(id: string, city: any): Promise<any> {
    try {
      const cityExists = await this.cityRepository.findById(id)
      if (cityExists.rowCount === 0) {
        return {
          message: 'Cidade não encontrada',
          status: 404,
          city: [],
        }
      }

      const cityUpdated = await this.cityRepository.update(id, city)
      return {
        message: 'Cidade atualizada com sucesso',
        status: 200,
        cityUpdated: cityUpdated.rows[0],
      }
    } catch (error) {
      return {
        message: 'Erro ao atualizar cidade',
        status: 500,
        city: [],
      }
    }
  }
}
