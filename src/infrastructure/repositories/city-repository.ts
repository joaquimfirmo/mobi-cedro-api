import { badImplementation } from '@hapi/boom'
import Connection from '../database/connection'
import ICityRepository from '../../application/repositories/city-repository'
import City from '../../domain/entities/city'
import ICache from '../../application/cache/cache'

export default class CityRepository implements ICityRepository {
  constructor(
    private readonly connection: Connection,
    private readonly cache: ICache
  ) {}

  async create(city: City): Promise<any> {
    try {
      const result = await this.connection.execute(
        `INSERT INTO cidades (id, nome, uf) VALUES ($1, $2, $3)`,
        [city.id, city.nome, city.uf]
      )

      return result
    } catch (error) {
      console.log(error)
      throw badImplementation('Erro ao criar cidade')
    }
  }

  async findAll(limit: number = 20, offset: number = 0): Promise<any> {
    const cacheKey = `cities:${limit}:${offset}`
    let result

    result = this.getCitiesFromCache(cacheKey)
    if (result) {
      console.log('Retornando cidades do cache')
      return result
    }

    try {
      result = await this.connection.execute(
        `SELECT * FROM "cidades" LIMIT $1 OFFSET $2`,
        [limit, offset]
      )

      if (result.rowCount > 0) {
        this.setCitiesToCache(cacheKey, result)
      }
      return result
    } catch (error) {
      console.log(error)
      throw badImplementation('Erro ao buscar cidades')
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const result = await this.connection.execute(
        `SELECT * FROM "cidades" WHERE id = $1`,
        [id]
      )
      return result
    } catch (error) {
      console.log(error)
      throw badImplementation('Erro ao buscar cidade por id')
    }
  }

  async findByNameAndUf(nome: string, uf: string): Promise<any> {
    try {
      const result = await this.connection.execute(
        `SELECT * FROM "cidades" WHERE nome = $1 AND uf = $2`,
        [nome, uf]
      )
      return result
    } catch (error) {
      throw badImplementation('Erro ao buscar cidade por nome e uf')
    }
  }

  async update(id: string, city: any): Promise<any> {
    try {
      const result = await this.connection.execute(
        `UPDATE cidades SET nome = $1, uf = $2 WHERE id = $3`,
        [city.nome, city.uf, id]
      )
      return result
    } catch (error) {
      console.log(error)
      throw badImplementation('Erro ao atualizar cidade')
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const result = await this.connection.execute(
        `DELETE FROM cidades WHERE id = $1`,
        [id]
      )
      return result
    } catch (error) {
      console.log(error)
      throw badImplementation('Erro ao deletar cidade')
    }
  }

  getCitiesFromCache(key: string): any {
    return this.cache.get(key)
  }

  setCitiesToCache(key: string, value: any): void {
    this.cache.set(key, value)
    console.log('Cidades salvas no cache')
  }
}
