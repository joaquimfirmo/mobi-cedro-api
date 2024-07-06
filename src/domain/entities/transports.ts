/* eslint-disable no-useless-escape */
import crypto from 'crypto'
import createHashs from '../../utils/createHashs'
import {
  IsString,
  MinLength,
  MaxLength,
  IsUUID,
  IsEnum,
  Matches,
} from 'class-validator'

export default class Transports {
  @IsUUID(4)
  public readonly id: string

  @IsString()
  @MinLength(2, {
    message: 'Cidade de origem deve ter no mínimo 2 caracteres',
  })
  @MaxLength(100, {
    message: 'Cidade de origem deve ter no máximo 100 caracteres',
  })
  public readonly cidadeOrigem: string

  @IsString()
  @MinLength(2, {
    message: 'Cidade de destino deve ter no mínimo 2 caracteres',
  })
  @MaxLength(100, {
    message: 'Cidade de destino deve ter no máximo 100 caracteres',
  })
  public readonly cidadeDestino: string

  @IsEnum([
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ])
  public readonly diaSemana: string

  @IsString()
  @MinLength(5, {
    message: 'Localização deve ter no mínimo 5 caracteres',
  })
  @MaxLength(100, {
    message: 'Localização deve ter no máximo 100 caracteres',
  })
  public readonly localizacao: string

  @IsString()
  @Matches(/^([0-9]{2})\:([0-9]{2})\:([0-9]{2})$/)
  public readonly horaSaida: string

  @IsString()
  @Matches(/^([0-9]{2})\:([0-9]{2})\:([0-9]{2})$/)
  public readonly horaChegada: string

  @IsString()
  @Matches(/^\$\d+(?:\.\d{0,2})$/)
  public readonly preco: number

  @IsUUID(4)
  public readonly veiculoId: string

  @IsUUID(4)
  public readonly empresaId: string

  @IsUUID(4)
  public readonly cidadeId: string

  public readonly md5_hash: string

  constructor(
    id: string,
    cidade_origem: string,
    cidade_destino: string,
    dia_semana: string,
    localizacao: string,
    hora_saida: string,
    hora_chegada: string,
    preco: number,
    id_veiculo: string,
    id_empresa: string,
    id_cidade: string,
    md5_hash: string
  ) {
    this.id = id
    this.cidadeOrigem = cidade_origem
    this.cidadeDestino = cidade_destino
    this.diaSemana = dia_semana
    this.localizacao = localizacao
    this.horaSaida = hora_saida
    this.horaChegada = hora_chegada
    this.preco = preco
    this.veiculoId = id_veiculo
    this.empresaId = id_empresa
    this.cidadeId = id_cidade
    this.md5_hash = md5_hash
  }

  public static create(data: any): Transports {
    const id = crypto.randomUUID()
    const {
      cidade_origem,
      cidade_destino,
      dia_semana,
      localizacao,
      hora_saida,
      preco,
      hora_chegada,
      id_veiculo,
      id_empresa,
      id_cidade,
    } = data

    const md5_hash = createHashs.createHashMd5({
      cidade_origem,
      cidade_destino,
      dia_semana,
      localizacao,
      hora_saida,
      hora_chegada,
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
