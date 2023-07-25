const ScheduleRepositoryInterface = require('../../domain/repositories/schedule-repository')
const transaction = require('../database/transaction')
const Schedule = require('../../domain/entities/schedule')

class ScheduleRepository extends ScheduleRepositoryInterface {
  async all() {
    await transaction.open()
    const conn = await transaction.get()
    const [rows] = await conn.execute(
      'select * from horarios ORDER BY created_at DESC limit 10'
    )

    const schedules = rows.map((row) => new Schedule(row))

    return schedules
  }

  async findById(id) {
    await transaction.open()
    const conn = await transaction.get()
    const [rows] = await conn.execute(
      'select * from horarios where `id` = ? ORDER BY created_at DESC limit 10',
      [id]
    )

    const schedules = new Schedule(rows[0])
    return schedules
  }

  async create({ id, diaSemana, chegada, saida, ativo }) {
    await transaction.open()
    const conn = await transaction.get()
    try {
      const rows = await conn.execute(
        'insert into horarios(id, diaSemana,saida, chegada, ativo) values (?, ?, ?, ?, ?);',
        [id, diaSemana, chegada, saida, ativo]
      )
      return rows
    } catch (error) {
      console.log(error)
    }
  }

  async delete(id) {
    await transaction.open()
    const conn = await transaction.get()
    try {
      const result = await conn.execute('DELETE from horarios WHERE `id` = ?', [
        id,
      ])
      return result[0].affectedRows
    } catch (error) {
      console.log(error)
      return
    }
  }
}

module.exports = ScheduleRepository
