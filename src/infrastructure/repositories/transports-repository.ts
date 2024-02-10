import ITransportsRepository from '../../application/repositories/transports-repository'

export default class TransportsRepository implements ITransportsRepository {
  constructor(private readonly connection: any) {}

  async findAll(): Promise<any> {
    const result = await this.connection.execute(
      `SELECT rotas.cidade_origem,
              rotas.cidade_destino, 
              rotas.hora_saida,
              rotas.hora_chegada,
              rotas.preco,
              veiculos.nome,
              empresas.nome_fantasia
        FROM rotas
            INNER JOIN veiculos ON veiculos.id = rotas.id_veiculo
            INNER JOIN empresas on empresas.id = rotas.id_empresa`,
      []
    )
    //this.connection.end()
    return result
  }

  findByCity(cityId: string): Promise<any> {
    const result = this.connection.execute(
      `SELECT rotas.cidade_origem,
            rotas.cidade_destino, 
            rotas.hora_saida,
            rotas.hora_chegada,
            rotas.preco,
            veiculos.nome,
            empresas.nome_fantasia,
            rotas.id_cidade
        FROM rotas
            INNER JOIN veiculos ON veiculos.id = rotas.id_veiculo 
            INNER JOIN empresas ON empresas.id = rotas.id_empresa
        WHERE rotas.id_cidade = $1
        ORDER BY rotas.hora_saida ASC;`,
      [cityId]
    )

    //this.connection.end()
    return result
  }
}
