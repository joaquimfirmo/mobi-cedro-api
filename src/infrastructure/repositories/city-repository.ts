import ICityRepository from '../../application/repositories/city-repository'
import City from '../../domain/entities/city'

export default class CityRepository implements ICityRepository {
  constructor(private readonly connection: any) {}

  async create(city: City): Promise<any> {
    const result = await this.connection.execute(
      `INSERT INTO cidades (id, nome, uf) VALUES ($1, $2, $3)`,
      [city.id, city.name, city.uf]
    )

    return result
  }

  async findAll(limit: number = 20, offset: number = 0): Promise<any> {
    try {
      const result = await this.connection.execute(
        `SELECT * FROM "cidades" LIMIT $1 OFFSET $2`,
        [limit, offset]
      )
      return result
    } catch (error) {
      throw new Error('Erro ao buscar cidades')
    }
  }
}
