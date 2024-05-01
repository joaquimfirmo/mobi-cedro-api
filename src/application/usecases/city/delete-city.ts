import { Service } from 'typedi'
import { InjectRepository } from '../../../infrastructure/di/decorators/inject-repositrory'
import CityRepository from '../../../infrastructure/repositories/city-repository'
import ICityRepository from '../../../application/repositories/city-repository'

@Service()
export default class DeleteCity {
  constructor(
    @InjectRepository(CityRepository)
    readonly cityRepository: ICityRepository
  ) {}

  async execute(id: string): Promise<any> {
    const cityExists = await this.cityRepository.findById(id)

    if (cityExists.rowCount === 0) {
      return {
        message: 'Cidade para exclusão não encontrada',
        status: 404,
        data: [],
      }
    }

    await this.cityRepository.delete(id)

    return {
      data: id,
      message: 'Cidade excluída com sucesso!',
      status: 200,
    }
  }
}
