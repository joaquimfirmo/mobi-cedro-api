import { Request, ResponseToolkit } from '@hapi/hapi'
import ListAllSchedules from '../../application/usecases/schedules/list-schedules'
import ScheduleRepository from '../../infrastructure/repositories/schedule-repository'
import Connection from '../../infrastructure/database/connection'
import Pool  from '../../infrastructure/database/pool'

export class ScheduleController {
  public async getSchedule(request: Request, h: ResponseToolkit): Promise<any> {
    const pool = Pool.getInstance()
    const connection = new Connection(pool)
    const scheduleRepository = new ScheduleRepository(connection)
    await connection.connect()
    const listAllSchedules = new ListAllSchedules(scheduleRepository)
    const schedules = await listAllSchedules.execute()
    return h.response(schedules).code(200)
  }
}
