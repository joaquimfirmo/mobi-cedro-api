const AllSchedules = require('../../application/use_cases/schedules/list-all-schedules')
const ScheduleRepository = require('../../infrastructure/repositories/schedule-repository')
const Connection = require('../../infrastructure/database/connection')
const Pool = require('../../infrastructure/database/pool')

class ScheduleController {
  async all() {
    const pool = Pool.create()
    const connection = new Connection(pool)
    await connection.connect()
    const schedulesRepository = new ScheduleRepository(connection)
    const allSchedules = new AllSchedules(schedulesRepository)
    const schedules = await allSchedules.execute()

    return schedules
  }
}

module.exports = ScheduleController
