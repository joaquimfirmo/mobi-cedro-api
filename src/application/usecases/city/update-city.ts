import { Service } from 'typedi'
import { InjectRepository } from '../../../infrastructure/di/decorators/inject-repository'
import CityRepository from '../../../infrastructure/repositories/city-repository'
import ICityRepository from '../../../application/repositories/city-repository'

@Service()
export default class UpdateCity {
  constructor(
    @InjectRepository(CityRepository)
    readonly cityRepository: ICityRepository
  ) {}

  async execute(id: string, city: any): Promise<any> {
    const cityExists = await this.cityRepository.findById(id)

    if (cityExists.rowCount === 0) {
      return {
        message: 'Cidade não encontrada',
        status: 404,
        data: [],
      }
    }

    const result = await this.cityRepository.update(id, city)

    return {
      message: 'Cidade atualizada com sucesso',
      status: 200,
      data: result.rows[0],
    }
  }
}
