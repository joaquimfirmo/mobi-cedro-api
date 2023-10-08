class Schedule {
  constructor(id, diaSemana, horaSaida, horaChegada, ativo = true) {
    this.id = id
    this.diaSemana = diaSemana
    this.horaSaida = horaSaida
    this.horaChegada = horaChegada
    this.ativo = ativo
  }
}

module.exports = Schedule
