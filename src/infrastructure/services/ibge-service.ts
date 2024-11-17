import IBGEServiceInterface from '../../application/services/ibge-service'
import AxiosClient from '../gateway/axios-client'
import { Service, Inject } from 'typedi'
import { cacheManager } from '../cacheManager'
import ICache from '../../application/cache/cache'

@Service()
export default class IBGEService
  extends AxiosClient
  implements IBGEServiceInterface
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
}
