const AllSchedules = require('../../application/use_cases/schedules/list-all-schedules')
const FindSchedulesById = require('../../application/use_cases/schedules/find-schedule-by-id')
// por enquanto os reposiories serão importados e passados para o use-case no controller
const ScheduleRepository = require('../../infrastructure/repositories/schedule-repository')

class ScheduleController {
  async all() {
    const schedulesRepository = new ScheduleRepository()
    const allSchedules = new AllSchedules(schedulesRepository)
    const schedules = await allSchedules.execute()

    return schedules
  }

  async find(request) {
    const schedulesRepository = new ScheduleRepository()
    const findSchedulesById = new FindSchedulesById(schedulesRepository)
    const { id } = request.params
    const schedule = await findSchedulesById.execute(id)

    return schedule
  }
}

module.exports = ScheduleController
