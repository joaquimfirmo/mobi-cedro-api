import { Service } from 'typedi'
import { InjectRepository } from '../../../infrastructure/di/decorators/inject-repository'
import ICityRepository from '../../../application/repositories/city-repository'
import CityRepository from '../../../infrastructure/repositories/city-repository'
import City from '../../../domain/entities/city'

@Service()
export default class FindAllCity {
  constructor(
    @InjectRepository(CityRepository)
    private readonly cityRepository: ICityRepository
  ) {}

  async execute(limit: number, offset: number) {
    const { cities, rows } = await this.cityRepository.findAll(limit, offset)

    const data: City[] = cities

    return {
      data,
      rows,
    }
  }
}
