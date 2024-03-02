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
    const result = await this.cityRepository.create(city)

    if (result instanceof Error) {
      return {
        message: 'Erro ao criar cidade',
        status: 500,
      }
    }
    return {
      cityCreated: city,
      message: 'Cidade criada com sucesso',
      status: 201,
    }
  }
}
