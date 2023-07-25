const AllSchedules = require('../../application/use_cases/schedules/list-all-schedules')
const FindSchedulesById = require('../../application/use_cases/schedules/find-schedule-by-id')
const CreateSchedule = require('../../application/use_cases/schedules/create-schedule')
const DeleteSchedule = require('../../application/use_cases/schedules/delete-schedule')
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

  async create(request) {
    const schedulesRepository = new ScheduleRepository()
    const createSchedule = new CreateSchedule(schedulesRepository)
    const schedule = await createSchedule.execute(request.payload)

    return schedule
  }

  async delete(request, h) {
    const schedulesRepository = new ScheduleRepository()
    const deleteSchedule = new DeleteSchedule(schedulesRepository)
    const { id } = request.params
    const { message, code } = await deleteSchedule.execute(id)

    return h.response({ message }).code(code)
  }
}

module.exports = ScheduleController
