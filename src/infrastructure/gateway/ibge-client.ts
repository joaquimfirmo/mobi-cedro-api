import IBGEClientInterface from '../../application/gateway/ibge-client'
import AxiosClient from '../gateway/axios-client'
import { Service, Inject } from 'typedi'
import { cacheManager } from '../cacheManager'
import ICache from '../../application/cache/cache'

@Service()
export default class IBGEClient
  extends AxiosClient
  implements IBGEClientInterface
{
  constructor(
    @Inject(cacheManager)
    private readonly cache: ICache
  ) {
    super(String(process.env.IBGE_API_URL))
  }

  async getCitiesByState(uf: string): Promise<any[]> {
    const cacheKey = `cities:${uf}`
    const params = {
      orderBy: 'nome',
    }

    const cacheCities = this.cache.get(cacheKey)
    if (cacheCities) {
      console.log('Retornando cidades salvas no cache')
      return cacheCities
    }

    const result = this.get(`/localidades/estados/${uf}/municipios`, {}, params)
    this.cache.set(cacheKey, result)
    return result
  }

  async getCityByCode(code: number): Promise<any> {
    const params = {
      orderBy: 'nome',
    }
    const cacheKey = `city:${code}`

    const cacheCity = this.cache.get(cacheKey)
    if (cacheCity) {
      console.log('Retornando cidade salva no cache')
      return cacheCity
    }

    const result = await this.get(`/localidades/municipios/${code}`, {}, params)
    console.log('Cidade encontrada ibge:', result)

    if (result.id) {
      return {
        id: result.id,
        nome: result.nome,
        uf: result.microrregiao.mesorregiao.UF.sigla,
      }
    }
    return {
      id: null,
      nome: null,
      uf: null,
    }
  }

  async isValidCity(city: string, code: number): Promise<any> {
    const findCity = await this.getCityByCode(code)
    console.log('Cidade encontrada:', findCity)
    if (findCity.id === null) {
      return false
    }
    if (findCity.nome === city && findCity.id === code && findCity.uf) {
      return {
        isValid: true,
        city: {
          codigo_ibge: findCity.id,
          nome: findCity.nome,
          uf: findCity.uf,
        },
      }
    }
    return false
  }
}
