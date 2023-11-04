export default class findSchedulesByCity {
  constructor(private readonly scheduleRepository: any) {}

  async execute(city: string): Promise<any> {
    const schedules = await this.scheduleRepository.findByCity(city)
    return schedules
  }
}
