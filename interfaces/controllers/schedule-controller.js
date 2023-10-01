const AllSchedules = require('../../application/use_cases/schedules/list-all-schedules')
const FindSchedulesByCity = require('../../application/use_cases/schedules/find-schedules-by-city')
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

  async findSchedulesByCity(request) {
    const { city } = request.params
    const pool = Pool.create()
    const connection = new Connection(pool)
    await connection.connect()
    const schedulesRepository = new ScheduleRepository(connection)
    const findSchedulesByCity = new FindSchedulesByCity(schedulesRepository)
    const schedules = await findSchedulesByCity.execute(city)

    return schedules
  }
}

module.exports = ScheduleController
