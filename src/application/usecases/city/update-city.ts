import { Service } from 'typedi'
import City from '../../../domain/entities/city'
import { InjectRepository } from '../../../infrastructure/di/decorators/inject-repository'
import CityRepository from '../../../infrastructure/repositories/city-repository'
import ICityRepository from '../../../application/repositories/city-repository'

@Service()
export default class UpdateCity {
  constructor(
    @InjectRepository(CityRepository)
    readonly cityRepository: ICityRepository
  ) {}

  async execute(id: string, city: City): Promise<any> {
    const cityExists = await this.cityRepository.findById(id)

    if (cityExists.rowCount === 0) {
      return {
        message: 'Cidade não encontrada',
        status: 404,
        data: [],
      }
    }

    const result = await this.cityRepository.update(id, city)

    if (result) {
      return {
        message: 'Cidade atualizada com sucesso',
        status: 200,
      }
    }

    return {
      message: 'Não foi possível atualizar a cidade',
      status: 500,
    }
  }
}
