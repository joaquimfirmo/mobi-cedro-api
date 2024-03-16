import crypto from 'crypto'
import {
  IsString,
  MinLength,
  MaxLength,
  Length,
  IsUUID,
  IsNumberString,
} from 'class-validator'

export default class Company {
  @IsUUID(4)
  public readonly id: string
  @IsString()
  @MinLength(2, {
    message: 'Nome da empresa deve ter no mínimo 2 caracteres',
  })
  @MaxLength(100, {
    message: 'Nome da empresa deve ter no máximo 100 caracteres',
  })
  public readonly razaoSocial: string

  @IsString()
  @MinLength(2, {
    message: 'Nome fantasia deve ter no mínimo 2 caracteres',
  })
  @MaxLength(100, {
    message: 'Nome fantasia deve ter no máximo 100 caracteres',
  })
  public readonly nomeFantasia: string

  @Length(14, 14, {
    message: 'CNPJ deve ter 14 caracteres',
  })
  @IsNumberString()
  public readonly cnpj: string

  @IsUUID(4, {
    message: 'ID da cidade deve ser um UUID válido',
  })
  public readonly idCidade: string

  constructor(
    razao_social: string,
    nome_fantasia: string,
    cnpj: string,
    id_cidade: string,
    id?: string
  ) {
    this.id = id || crypto.randomUUID()
    this.razaoSocial = razao_social
    this.nomeFantasia = nome_fantasia
    this.cnpj = cnpj
    this.idCidade = id_cidade
  }
}
