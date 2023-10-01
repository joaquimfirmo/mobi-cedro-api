class FindSchedulesByCity {
  constructor(schedulesRepository) {
    this.schedulesRepository = schedulesRepository
  }

  async execute(city) {
    const schedules = await this.schedulesRepository.findByCity(city)
    return schedules.length
      ? schedules
      : `Nenhum horário encontrado para ${city}`
  }
}

module.exports = FindSchedulesByCity
