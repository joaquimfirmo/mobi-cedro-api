class FindSchedulesById {
  constructor(schedulesRepository) {
    this.schedulesRepository = schedulesRepository
  }

  async execute(id) {
    const schedules = await this.schedulesRepository.findById(id)
    return schedules
  }
}

module.exports = FindSchedulesById
