class Schedule {
  constructor({ id, diaSemana, chegada, saida, ativo }) {
    this.id = id
    this.diaSemana = diaSemana
    this.chegada = chegada
    this.saida = saida
    this.ativo = ativo
  }
}

module.exports = Schedule
