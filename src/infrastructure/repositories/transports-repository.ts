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
                transportes.nome,
                tipos_transportes.veiculo,
                horarios.hora_saida,
                horarios.hora_chegada
        FROM horarios
            INNER JOIN rotas ON rotas.id = horarios.id_rota
            INNER JOIN transportes ON transportes.id = horarios.id_transporte
            INNER JOIN tipos_transportes ON tipos_transportes.id = transportes.id_tipo_transporte
        WHERE rotas.cidade_origem = $1
        ORDER BY horarios.hora_saida ASC;`,
      [city]
    )

    this.connection.end()
    return result
  }
}
