import { badImplementation } from '@hapi/boom'
import ICityRepository from '../../application/repositories/city-repository'
import ICache from '../../application/cache/cache'
import Connection from '../database/connection'
import City from '../../domain/entities/city'
import { BaseRepository } from './base-repository'
class CityRepository extends BaseRepository implements ICityRepository {
  constructor(
    private readonly connection: Connection,
    private readonly cache: ICache
  ) {
    super()
  }

  async create(city: City): Promise<any> {
    try {
      const result = await this.connection.execute(
        `INSERT INTO cidades (id, nome, uf,cod_ibge) VALUES ($1, $2, $3, $4) RETURNING *`,
        [city.id, city.nome, city.uf, city.cod_ibge]
      )

      if (result.rowCount > 0) {
        this.cache.del('cities:20:0')
      }
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
        this.setCitiesToCache(cacheKey, {
          cities: result.rows.map(
            (city: any) => new City(city.id, city.nome, city.uf, city.cod_ibge)
          ),
          rows: result.rowCount,
        })
      }
      return {
        cities: result.rows.map(
          (city: any) => new City(city.id, city.nome, city.uf, city.cod_ibge)
        ),
        rows: result.rowCount,
      }
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

  async findByNameAndUf(city: City): Promise<any> {
    try {
      const result = await this.connection.execute(
        `SELECT * FROM "cidades" WHERE nome = $1 AND uf = $2`,
        [city.nome, city.uf]
      )
      console.log(result)
      return result
    } catch (error) {
      throw badImplementation('Erro ao buscar cidade por nome e uf')
    }
  }

  async findByNameAndCode(city: string, code: number): Promise<any> {
    try {
      const result = await this.connection.execute(
        `SELECT * FROM "cidades" WHERE nome = $1 AND cod_ibge = $2 LIMIT 1`,
        [city, code]
      )
      return result
    } catch (error) {
      throw badImplementation('Erro ao buscar cidade por nome e código')
    }
  }

  async update(id: string, city: any): Promise<any> {
    try {
      const result = await this.connection.execute(
        `UPDATE cidades SET nome = $1, uf = $2 WHERE id = $3`,
        [city.nome, city.uf, id]
      )

      if (result.rowCount > 0) {
        this.cache.del('cities:20:0')
        return true
      }
      return false
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

      if (result.rowCount > 0) {
        this.cache.del('cities:20:0')
      }
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

export default CityRepository
