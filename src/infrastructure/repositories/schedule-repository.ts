import IScheduleRepository from '../../application/repositories/schedule-repository'

export default class ScheduleRepository implements IScheduleRepository {
  constructor(private readonly connection: any) {}

  async list(): Promise<any> {
    const result = await this.connection.execute(
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
            INNER JOIN tarifas ON  tarifas.id = rotas.tarifa_id `,
      []
    )
    this.connection.end()
    return result
  }

  findByCity(city: string): Promise<any> {
    const result = this.connection.execute(
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
        WHERE rotas.cidade_origem = $1;`,
      [city]
    )

    this.connection.end()
    return result
  }
}
