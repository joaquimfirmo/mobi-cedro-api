const Schedule = require('../../../domain/entities/schedule')

class UpdateSchedule {
  constructor(schedulesRepository) {
    this.schedulesRepository = schedulesRepository
  }

  async execute(id, { diaSemana, chegada, saida, ativo }) {
    const schedule = await this.schedulesRepository.findById(id)

    if (schedule) {
      schedule.diaSemana = diaSemana || schedule.diaSemana
      schedule.chegada = chegada || schedule.chegada
      schedule.saida = saida || schedule.saida
      schedule.ativo = ativo || schedule.ativo

      const scheduleUpdated = await this.schedulesRepository.update(schedule)

      return scheduleUpdated
        ? { message: 'Horário atualizado com sucesso', code: 200 }
        : { message: 'Erro ao atualizar horário', code: 400 }
    }
    return { message: 'Horário não encontrado', code: 400 }
  }
}

module.exports = UpdateSchedule
