const ScheduleRepositoryInterface = require('../../domain/repositories/schedule-repository')

class ScheduleRepository extends ScheduleRepositoryInterface {
  constructor(connection) {
    super()
    this.conn = connection
  }
  async all() {
    const { rows: result } = await this.conn.query(
      `SELECT horarios.dia_semana,
                rotas.cidade_origem,
                rotas.cidade_destino,
                rotas.tipo_veiculo,
                horarios.hora_saida,
                horarios.hora_chegada
        FROM rotas
        INNER JOIN rotas_horarios ON rotas.id = rotas_horarios.rotas_id
        INNER JOIN horarios ON horarios.id = rotas_horarios.horarios_id
        WHERE rotas.ativo = TRUE
          AND horarios.ativo = TRUE;`,
      []
    )
    this.conn.close()
    return result
  }
}

module.exports = ScheduleRepository
