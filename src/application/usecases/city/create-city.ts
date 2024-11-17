import City from '../../../domain/entities/city'
import { cityRepository } from '../../../infrastructure/repositories/city-repository'
import ICityRepository from '../../../application/repositories/city-repository'
import { cityIsValid } from '../../../utils/validateCity'
import { Service, Inject } from 'typedi'
import { badRequest } from 'boom'

@Service()
export default class CreateCity {
  constructor(
    @Inject(cityRepository)
    private readonly repository: ICityRepository
  ) {}

  async execute(city: City): Promise<any> {
    if (!cityIsValid(city.nome, city.uf)) {
      throw badRequest(`Cidade ${city.nome}-${city.uf} é inválida`)
    }

    const cityExists = await this.repository.findByNameAndUf(city)

    if (cityExists.rows?.length > 0) {
      throw badRequest(`Cidade ${city.nome}-${city.uf} já existe`)
    }
    await this.repository.create(city)

    return {
      data: city,
      message: 'Cidade criada com sucesso',
      status: 201,
    }
  }
}
