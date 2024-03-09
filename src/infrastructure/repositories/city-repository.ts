import ICityRepository from '../../application/repositories/city-repository'
import City from '../../domain/entities/city'

export default class CityRepository implements ICityRepository {
  constructor(private readonly connection: any) {}

  async create(city: City): Promise<any> {
    try {
      const result = await this.connection.execute(
        `INSERT INTO cidades (id, nome, uf) VALUES ($1, $2, $3)`,
        [city.id, city.name, city.uf]
      )

      return result
    } catch (error) {
      console.log(error)
      throw new Error('Erro ao criar cidade')
    }
  }

  async findAll(limit: number = 20, offset: number = 0): Promise<any> {
    try {
      const result = await this.connection.execute(
        `SELECT * FROM "cidades" LIMIT $1 OFFSET $2`,
        [limit, offset]
      )
      return result
    } catch (error) {
      return new Error('Erro ao buscar cidades')
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
      throw new Error('Erro ao buscar cidade')
    }
  }

  async findByNameAndUf(name: string, uf: string): Promise<any> {
    try {
      const result = await this.connection.execute(
        `SELECT * FROM "cidades" WHERE nome = $1 AND uf = $2`,
        [name, uf]
      )
      return result
    } catch (error) {
      throw new Error('Erro ao buscar cidade')
    }
  }

  async update(id: string, city: any): Promise<any> {
    try {
      const result = await this.connection.execute(
        `UPDATE cidades SET nome = $1, uf = $2 WHERE id = $3`,
        [city.name, city.uf, id]
      )
      return result
    } catch (error) {
      console.log(error)
      return new Error('Erro ao atualizar cidade')
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
      return new Error('Erro ao excluir cidade')
    }
  }
}
