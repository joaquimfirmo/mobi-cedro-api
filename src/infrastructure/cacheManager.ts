import { Container, Token } from 'typedi'
import NodeCache from 'node-cache'
import ICache from '../application/cache/cache'

export class CacheManager implements ICache {
  private cache: NodeCache

  constructor() {
    this.cache = new NodeCache({ stdTTL: 300, checkperiod: 120 })
  }

  public get(key: string) {
    return this.cache.get(key)
  }

  public set(key: string, cities: any) {
    this.cache.set(key, cities)
  }
  public del(key: string) {
    if (this.cache.has(key)) {
      console.log('Deletando cache')
      this.cache.del(key)
    }
    return
  }
}

const CacheManagerToken = new Token<CacheManager>()

Container.set(CacheManagerToken, new CacheManager())

export { CacheManagerToken }
