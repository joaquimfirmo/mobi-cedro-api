import CityServiceInterface from '../../application/services/city-service'
import { Service, Inject } from 'typedi'
import { InjectRepository } from '../di/decorators/inject-repository'
import { cacheManager } from '../cacheManager'
import ICache from '../../application/cache/cache'
import CityRepository from '../repositories/city-repository'
import ICityRepository from '../../application/repositories/city-repository'
import IBGEClient from '../gateway/ibge-client'
import City from '../../domain/entities/city'
import { badRequest } from '@hapi/boom'

@Service()
export default class CityService implements CityServiceInterface {
  constructor(
    private readonly ibgeClient: IBGEClient,
    @Inject(cacheManager)
    private readonly cache: ICache,
    @InjectRepository(CityRepository)
    private readonly cityRepository: ICityRepository
  ) {}

  async isValidCity(city: string, code: number): Promise<any> {
    const cacheKey = `city:${city}:${code}`
    const cachedCity = await this.cache.get(cacheKey)
    if (cachedCity) {
      return cachedCity
    }

    const cityIsValid = await this.ibgeClient.isValidCity(city, code)
    if (cityIsValid.isValid) {
      this.cache.set(cacheKey, cityIsValid)
    }
    return cityIsValid
  }

  async findOrCreateCity(city: string, uf: string, code: number): Promise<any> {
    const cacheKey = `city:${code}:${city}:${uf}-cityFound`

    if (this.cache.get(cacheKey)) {
      console.log('Retornando cidade do cache')
      return this.cache.get(cacheKey)
    }
    const cityExists = await this.cityRepository.findByNameAndCode(city, code)
    if (cityExists.rowCount > 0) {
      this.cache.set(cacheKey, cityExists.rows[0])
      return cityExists.rows[0]
    }

    const cityIsValid = await this.ibgeClient.isValidCity(city, code)
    if (!cityIsValid.isValid) {
      throw badRequest('Cidade ou código inválido')
    }
    const cityData = City.create(city, uf, code)
    const cityCreated = await this.cityRepository.create(cityData)
    this.cache.set(cacheKey, cityCreated.rows[0])
    return cityCreated.rows[0]
  }
}
