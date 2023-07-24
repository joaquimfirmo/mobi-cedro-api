const AllSchedules = require('../../application/use_cases/schedules/list-all- schedules')
// por enquanto os reposiories serão importados e passados para o use-case no controller
const ScheduleRepository = require('../../infrastructure/repositories/schedule-repository')

class ScheduleController {
  async all() {
    const schedulesRepository = new ScheduleRepository()
    const allSchedules = new AllSchedules(schedulesRepository)
    const schedules = await allSchedules.execute()

    return schedules
  }
}

module.exports = ScheduleController
