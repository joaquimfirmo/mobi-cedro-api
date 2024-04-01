import { Inject, Service } from 'typedi'
import CityRepository from '../../../infrastructure/repositories/city-repository'

@Service()
export default class FindAllCity {
  constructor(
    @Inject('repository.city') readonly cityRepository: CityRepository
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
