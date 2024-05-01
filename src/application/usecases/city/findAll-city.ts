import { Service } from 'typedi'
import { InjectRepository } from '../../../infrastructure/di/decorators/inject-repositrory'
import CityRepository from '../../../infrastructure/repositories/city-repository'
import ICityRepository from '../../../application/repositories/city-repository'

@Service()
export default class FindAllCity {
  constructor(
    @InjectRepository(CityRepository) readonly cityRepository: ICityRepository
  ) {}

  async execute(limit: number, offset: number) {
    const result = await this.cityRepository.findAll(limit, offset)

    return {
      message: 'Cidades encontradas com sucesso',
      status: 200,
      data: result,
    }
  }
}
