import crypto from 'crypto'
import createHashs from '../../utils/createHashs'

export default class Transports {
  constructor(
    public readonly id: string,
    public readonly cidadeOrigem: string,
    public readonly cidadeDestino: string,
    public readonly diaSemana: string,
    public readonly localizacao: string,
    public readonly horaSaida: string,
    public readonly horaChegada: string,
    public readonly preco: number,
    public readonly veiculoId: string,
    public readonly empresaId: string,
    public readonly cidadeId: string,
    public readonly md5_hash: string
  ) {}

  static create(
    cidade_origem: string,
    cidade_destino: string,
    dia_semana: string,
    localizacao: string,
    hora_saida: string,
    hora_chegada: string,
    preco: number,
    id_veiculo: string,
    id_empresa: string,
    id_cidade: string
  ): any {
    const id = crypto.randomUUID()
    const md5_hash = createHashs.createHashMd5({
      cidade_origem,
      cidade_destino,
      dia_semana,
      localizacao,
      hora_saida,
      hora_chegada,
      preco,
      id_veiculo,
      id_empresa,
      id_cidade,
    })

    return new Transports(
      id,
      cidade_origem,
      cidade_destino,
      dia_semana,
      localizacao,
      hora_saida,
      hora_chegada,
      preco,
      id_veiculo,
      id_empresa,
      id_cidade,
      md5_hash
    )
  }
}
