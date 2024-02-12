import { Inject, Service } from 'typedi'
import CityRepository from '../../../infrastructure/repositories/city-repository'

@Service('usecase.findAllCity')
export default class FindAllCity {
  constructor(
    @Inject('repository.city') readonly cityRepository: CityRepository
  ) {}

  async execute(limit: number, offset: number) {
    const result = await this.cityRepository.findAll(limit, offset)

    if (result instanceof Error) {
      return {
        message: 'Não foi possível buscar as cidades',
        status: 500,
        cities: null,
      }
    }

    return {
      message: 'Cidades encontradas com sucesso',
      status: 200,
      cities: result,
    }
  }
}
