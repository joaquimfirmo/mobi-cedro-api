const { randomUUID: uuid } = require('node:crypto')
const Schedule = require('../../../domain/entities/schedule')

class CreateSchedule {
  constructor(schedulesRepository) {
    this.schedulesRepository = schedulesRepository
  }

  async execute({ diaSemana, chegada, saida, ativo }) {
    const schedule = new Schedule(uuid(), diaSemana, chegada, saida, ativo)

    const schedules = await this.schedulesRepository.create(schedule)
    return schedules
  }
}

module.exports = CreateSchedule
