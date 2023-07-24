const HorarioRepositoryInterface = require("../../domain/repositories/schedules-repository");
const transaction = require("../database/transaction");
const Schedule = require("../../domain/entities/horario");

class HorarioRepository extends HorarioRepositoryInterface {
  async all() {
    await transaction.open();
    const conn = await transaction.get();
    const [rows] = await conn.execute(
      "select * from horarios ORDER BY created_at DESC limit 10"
    );

    const schedules = rows.map((row) => new Schedule(row));

    return schedules;
  }
}

module.exports = HorarioRepository;
