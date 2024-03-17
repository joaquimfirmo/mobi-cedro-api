import { Inject, Service } from 'typedi'
import City from '../../../domain/entities/city'
import CityRepository from '../../repositories/city-repository'

@Service('usecase.createCity')
export default class CreateCity {
  constructor(
    @Inject('repository.city') readonly cityRepository: CityRepository
  ) {}

  async execute(nome: string, uf: string): Promise<any> {
    const city = new City(nome, uf)
    const cityExists = await this.cityRepository.findByNameAndUf(nome, uf)

    if (cityExists.rows?.length > 0) {
      return {
        data: [],
        message: 'Cidade já existe',
        status: 400,
      }
    }
    await this.cityRepository.create(city)

    return {
      data: city,
      message: 'Cidade criada com sucesso',
      status: 201,
    }
  }
}
