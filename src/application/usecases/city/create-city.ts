import { Inject, Service } from 'typedi'
import City from '../../../domain/entities/city'
import CityRepository from '../../repositories/city-repository'

@Service('usecase.createCity')
export default class CreateCity {
  constructor(
    @Inject('repository.city') readonly cityRepository: CityRepository
  ) {}

  async execute(name: string, uf: string): Promise<any> {
    try {
      const city = new City(name, uf)
      const cityExists = await this.cityRepository.findByNameAndUf(name, uf)

      if (cityExists.rows?.length > 0) {
        return {
          message: 'Cidade já existe',
          status: 400,
        }
      }
      await this.cityRepository.create(city)

      return {
        cityCreated: city,
        message: 'Cidade criada com sucesso',
        status: 201,
      }
    } catch (error: any) {
      return {
        message: error.message,
        status: error.message === 'Cidade inválida' ? 400 : 500,
      }
    }
  }
}
