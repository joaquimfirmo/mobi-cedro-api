import ITransportsRepository from '../../application/repositories/transports-repository'

export default class TransportsRepository implements ITransportsRepository {
  constructor(private readonly connection: any) {}

  async list(): Promise<any> {
    const result = await this.connection.execute(
      `SELECT horarios.dia_semana,
                rotas.cidade_origem,
                rotas.cidade_destino,
                transportes.nome,
                tipos_transportes.veiculo,
                horarios.hora_saida,
                horarios.hora_chegada
        FROM horarios
            INNER JOIN rotas ON rotas.id = horarios.id_rota
            INNER JOIN transportes ON transportes.id = horarios.id_transporte
            INNER JOIN tipos_transportes ON tipos_transportes.id = transportes.id_tipo_transporte`,
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
