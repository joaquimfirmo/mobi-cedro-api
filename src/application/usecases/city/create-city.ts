import { Inject, Service } from 'typedi'
import City from '../../../domain/entities/city'
import CityRepository from '../../repositories/city-repository'

@Service('usecase.createCity')
export default class CreateCity {
  constructor(
    @Inject('repository.city') readonly cityRepository: CityRepository
  ) {}

  async execute(name: string, uf: string): Promise<any> {
    const city = City.create(name, uf)
    try {
      const result = await this.cityRepository.create(city)
      if (result.rowCount > 0) {
        return {
          cityCreated: city,
          message: 'Cidade criada com sucesso',
          status: 201,
        }
      }
    } catch (error) {
      console.log(error)
      return {
        cityCreated: null,
        message: 'Erro ao criar cidade',
        status: 500,
      }
    }
  }
}
