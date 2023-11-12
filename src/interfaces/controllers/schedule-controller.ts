import { Request, ResponseToolkit } from '@hapi/hapi'
import ListAllSchedules from '../../application/usecases/schedules/list-schedules'
import DatabaseRepositoryFactory from '../../infrastructure/factories/database-repository-factory'
import Connection from '../../infrastructure/database/connection'

class ScheduleController {
  connection: Connection

  constructor() {
    this.connection = new Connection()
  }

  public async getSchedules(
    request: Request,
    h: ResponseToolkit
  ): Promise<any> {
    await this.connection.connect()
    const scheduleRepository = new DatabaseRepositoryFactory(this.connection)
    const listAllSchedules = new ListAllSchedules(scheduleRepository)
    const schedules = await listAllSchedules.execute()
    return h.response(schedules).code(200)
  }

  // public async findSchedulesByCity(
  //   request: Request,
  //   h: ResponseToolkit
  // ): Promise<any> {
  //   const pool = Pool.getInstance()
  //   const connection = new Connection(pool)
  //   const scheduleRepository = new ScheduleRepository(connection)
  //   await connection.connect()
  //   const findSchedules = new FindSchedules(scheduleRepository)
  //   const schedules = await findSchedules.execute(request.params.city)
  //   return h.response(schedules).code(200)
  // }
}

export default new ScheduleController()
