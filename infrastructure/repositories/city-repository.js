const CityRepositoryInterface = require('../../domain/repositories/city-repository')
const transaction = require('../database/transaction')
const City = require('../../domain/entities/city')

class CityRepository extends CityRepositoryInterface {
  async all() {
    try {
      await transaction.open()
      const conn = await transaction.get()
      const [rows] = await conn.execute(
        'select * from cidades  ORDER BY created_at DESC limit 10'
      )

      const cities = rows.map((row) => new City(row))

      return cities
    } catch (error) {
      throw new Error(error)
    } finally {
      await transaction.close()
    }
  }
}

module.exports = CityRepository
