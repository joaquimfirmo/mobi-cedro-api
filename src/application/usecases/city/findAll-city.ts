import { Service, Inject } from 'typedi'
import ICityRepository from '../../../application/repositories/city-repository'
import { cityRepository } from '../../../infrastructure/repositories/city-repository'

import City from '../../../domain/entities/city'

@Service()
export default class FindAllCity {
  constructor(
    @Inject(cityRepository)
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
