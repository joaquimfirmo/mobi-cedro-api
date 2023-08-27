const ScheduleRepositoryInterface = require('../../domain/repositories/schedule-repository')
const Schedule = require('../../domain/entities/schedule')

class ScheduleRepository extends ScheduleRepositoryInterface {
  constructor(connection) {
    super()
    this.conn = connection
  }
  async all() {
    const [rows] = await this.conn.query(
      'select * from horarios ORDER BY created_at DESC',
      []
    )
    const schedules = rows.map((row) => new Schedule(row))

    this.conn.close()

    return schedules
  }

  async findById(id) {
    await transaction.open()
    const conn = await transaction.get()
    const [rows] = await conn.execute(
      'select * from horarios where `id` = ? limit 1',
      [id]
    )

    const schedules = rows[0] ? new Schedule(rows[0]) : ''
    return schedules
  }
}

module.exports = ScheduleRepository
