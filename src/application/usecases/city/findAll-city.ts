import { Service } from 'typedi'
import ICityRepository from '../../../application/repositories/city-repository'
import { CityRepository } from '../../../infrastructure/repositories/city-repository'
import { InjectRepository } from '../../../infrastructure/di/decorators/inject-repository'

import City from '../../../domain/entities/city'

@Service()
export default class FindAllCity {
  constructor(
    @InjectRepository(CityRepository)
    private readonly repository: ICityRepository
  ) {}

  async execute(limit: number, offset: number) {
    const { cities, rows } = await this.repository.findAll(limit, offset)
    console.log('cities', rows)

    const data: City[] = cities

    return {
      data,
      rows,
    }
  }
}
