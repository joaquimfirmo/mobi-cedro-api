class DeleteSchedule {
  constructor(schedulesRepository) {
    this.schedulesRepository = schedulesRepository
  }

  async execute(id) {
    const schedules = await this.schedulesRepository.delete(id)
    return schedules
      ? { message: 'Horário deletado com sucesso', code: 200 }
      : { message: 'Erro ao deleta o horário', code: 400 }
  }
}

module.exports = DeleteSchedule
