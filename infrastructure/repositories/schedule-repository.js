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
                horarios.hora_chegada,
                tarifas.valor
        FROM rotas
        INNER JOIN rotas_horarios ON rotas.id = rotas_horarios.rotas_id
        INNER JOIN horarios ON horarios.id = rotas_horarios.horarios_id
        INNER JOIN tarifas ON  tarifas.id = rotas.tarifa_id
        WHERE rotas.ativo = TRUE
          AND horarios.ativo = TRUE;`,
      []
    )
    this.conn.close()
    return result
  }

  async create(schedule) {
    console.log(schedule)
    try {
      const { rows: result } = await this.conn.query(
        `INSERT INTO horarios (id, dia_semana, hora_saida, hora_chegada, ativo) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [
          schedule.id,
          schedule.diaSemana,
          schedule.horaSaida,
          schedule.horaChegada,
          schedule.ativo,
        ]
      )

      this.conn.close()
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async findByCity(city) {
    try {
      const { rows: result } = await this.conn.query(
        `SELECT 
        horarios.dia_semana, 
        rotas.cidade_origem, 
        rotas.cidade_destino, 
        rotas.tipo_veiculo, 
        horarios.hora_saida, 
        horarios.hora_chegada,
        tarifas.valor 
      FROM 
        rotas 
        INNER JOIN rotas_horarios ON rotas.id = rotas_horarios.rotas_id 
        INNER JOIN horarios ON horarios.id = rotas_horarios.horarios_id
        INNER JOIN tarifas ON  tarifas.id = rotas.tarifa_id
      WHERE 
        rotas.ativo = TRUE 
        AND rotas.cidade_origem like '%$1%' 
        AND horarios.ativo = TRUE;`,
        [city]
      )

      this.conn.close()
      return result
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = ScheduleRepository
