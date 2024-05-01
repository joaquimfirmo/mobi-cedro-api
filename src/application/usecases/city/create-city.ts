import { Service } from 'typedi'
import { InjectRepository } from '../../../infrastructure/di/decorators/inject-repository'
import City from '../../../domain/entities/city'
import CityRepository from '../../../infrastructure/repositories/city-repository'
import ICityRepository from '../../../application/repositories/city-repository'

@Service()
export default class CreateCity {
  constructor(
    @InjectRepository(CityRepository) readonly cityRepository: ICityRepository
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
