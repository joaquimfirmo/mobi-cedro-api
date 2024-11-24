import {
  IsString,
  MinLength,
  MaxLength,
  Length,
  IsInt,
  IsNumberString,
} from 'class-validator'

import { IsValidCNPJ } from '../../utils/validation'

export default class CreateCompanyDto {
  @IsString()
  @MinLength(2, {
    message: 'Nome da empresa deve ter no mínimo 2 caracteres',
  })
  @MaxLength(100, {
    message: 'Nome da empresa deve ter no máximo 100 caracteres',
  })
  razao_social: string

  @IsString()
  @MinLength(2, {
    message: 'Nome fantasia deve ter no mínimo 2 caracteres',
  })
  @MaxLength(100, {
    message: 'Nome fantasia deve ter no máximo 100 caracteres',
  })
  nome_fantasia: string

  @Length(14, 14, {
    message: 'CNPJ deve ter 14 caracteres',
  })
  @IsValidCNPJ({
    message: 'CNPJ $value é inválido',
  })
  @IsNumberString()
  cnpj: string

  @IsString()
  @MinLength(2, {
    message: 'Nome da cidade deve ter no mínimo 2 caracteres',
  })
  cidade: string

  @IsString()
  @MinLength(2)
  @MaxLength(2)
  uf: string

  @IsInt({
    message: 'Código da cidade deve ser um número inteiro',
  })
  codigo_cidade: number
}
