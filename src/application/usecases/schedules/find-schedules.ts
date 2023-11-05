import ScheduleRepository from '../../repositories/schedule-repository'
import RepositoryFactory from '../../factories/repository-factory'

export default class findSchedulesByCity {
  scheduleRepository: ScheduleRepository
  constructor(private readonly scheduleRepositoryFactory: RepositoryFactory) {
    this.scheduleRepository =
      this.scheduleRepositoryFactory.createScheduleRepository()
  }

  async execute(city: string): Promise<any> {
    const schedules = await this.scheduleRepository.findByCity(city)
    return schedules
  }
}
