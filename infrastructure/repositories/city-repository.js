const CidadeRepositoryInterface = require("../../domain/repositories/cidade-repository");
const transaction = require("../database/transaction");
const Cidades = require("../../domain/entities/cidade");

class CidadeRepository extends CidadeRepositoryInterface {
  async all() {
    try {
      await transaction.open();
      const conn = await transaction.get();
      const [rows] = await conn.execute(
        "select * from cidades  ORDER BY created_at DESC limit 10"
      );

      const cities = rows.map((row) => new Cidades(row));

      return cities;
    } catch (error) {
      throw new Error(error);
    } finally {
      await transaction.close();
    }
  }
}

module.exports = CidadeRepository;
