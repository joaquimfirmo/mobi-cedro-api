import ScheduleRepository from '../../repositories/schedule-repository'
import RepositoryFactory from '../../factories/repository-factory'
export default class ListAllSchedules {
  scheduleRepository: ScheduleRepository

  constructor(private readonly scheduleRepositoryFactory: RepositoryFactory) {
    this.scheduleRepository =
      this.scheduleRepositoryFactory.createScheduleRepository()
  }

  async execute(): Promise<any> {
    const schedules = await this.scheduleRepository.list()
    return schedules
  }
}
