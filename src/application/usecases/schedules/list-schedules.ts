export default class ListAllSchedules {
  constructor(private readonly scheduleRepository: any) {}

  async execute(): Promise<any> {
    const schedules = await this.scheduleRepository.listAllSchedules()
    return schedules
  }
}
