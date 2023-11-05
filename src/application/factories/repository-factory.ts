import ScheduleRepository from '../repositories/schedule-repository'

export default interface RepositoryFactory {
  createScheduleRepository(): ScheduleRepository
}
