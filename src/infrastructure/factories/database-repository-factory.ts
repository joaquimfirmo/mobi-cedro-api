import Connection from '../../infrastructure/database/connection'
import ScheduleRepository from '../../infrastructure/repositories/schedule-repository'

export default class DatabaseRepositoryFactory {
  constructor(private readonly connection: Connection) {}

  createScheduleRepository(): ScheduleRepository {
    return new ScheduleRepository(this.connection)
  }
}
