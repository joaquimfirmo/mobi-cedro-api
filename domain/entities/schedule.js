class Schedule {
  constructor({
    id,
    dia_semana: diaSemana,
    hora_saida: horaSaida,
    hora_chegada: horaChegada,
    ativo = true,
  }) {
    this.id = id
    this.diaSemana = diaSemana
    this.horaSaida = horaSaida
    this.horaChegada = horaChegada
    this.ativo = ativo
  }
}

module.exports = Schedule
