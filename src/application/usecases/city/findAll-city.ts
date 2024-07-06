import { Service } from 'typedi'
import City from '../../../domain/entities/city'
import { InjectRepository } from '../../../infrastructure/di/decorators/inject-repository'
import CityRepository from '../../../infrastructure/repositories/city-repository'
import ICityRepository from '../../../application/repositories/city-repository'

@Service()
export default class FindAllCity {
  constructor(
    @InjectRepository(CityRepository) readonly cityRepository: ICityRepository
  ) {}

  async execute(limit: number, offset: number) {
    const result = await this.cityRepository.findAll(limit, offset)

    const cities: City[] = result.rows?.map(
      (city: any) => new City(city.id, city.nome, city.uf)
    )

    return {
      message: 'Cidades encontradas com sucesso',
      status: 200,
      data: {
        rowCount: result.rowCount,
        cities,
      },
    }
  }
}
