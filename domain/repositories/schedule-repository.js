class ScheduleRepositoryInterface {
  async all() {
    throw new Error('Método não implementado')
  }
  async findById(id) {
    throw new Error('Método não implementado')
  }

  async create({ id, diaSemana, chegada, saida, ativo }) {
    throw new Error('Método não implementado')
  }

  async delete(id) {
    throw new Error('Método não implementado')
  }
}

module.exports = ScheduleRepositoryInterface
