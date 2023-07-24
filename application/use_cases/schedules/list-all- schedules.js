class ListAllSchedules {
  constructor(schedulesRepository) {
    this.schedulesRepository = schedulesRepository;
  }

  async execute() {
    const schedules = await this.schedulesRepository.all();
    return schedules;
  }
}

module.exports = ListAllSchedules;
