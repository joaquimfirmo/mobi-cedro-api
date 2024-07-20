import { Service } from 'typedi'
import { badRequest } from 'boom'
import { InjectRepository } from '../../../infrastructure/di/decorators/inject-repository'
import City from '../../../domain/entities/city'
import CityRepository from '../../../infrastructure/repositories/city-repository'
import ICityRepository from '../../../application/repositories/city-repository'
import { cityIsValid } from '../../../utils/validateCity'

@Service()
export default class CreateCity {
  constructor(
    @InjectRepository(CityRepository)
    private readonly cityRepository: ICityRepository
  ) {}

  async execute(city: City): Promise<any> {
    if (!cityIsValid(city.nome, city.uf)) {
      throw badRequest(`Cidade ${city.nome}-${city.uf} é inválida`)
    }

    const cityExists = await this.cityRepository.findByNameAndUf(city)

    if (cityExists.rows?.length > 0) {
      throw badRequest(`Cidade ${city.nome}-${city.uf} já existe`)
    }
    await this.cityRepository.create(city)

    return {
      data: city,
      message: 'Cidade criada com sucesso',
      status: 201,
    }
  }
}
