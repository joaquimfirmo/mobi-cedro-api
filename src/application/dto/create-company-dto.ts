import {
  IsString,
  MinLength,
  MaxLength,
  Length,
  IsUUID,
  IsNumberString,
} from 'class-validator'

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

  @IsString()
  @Length(14, 14, {
    message: 'CNPJ deve ter 14 caracteres',
  })
  @IsNumberString()
  cnpj: string

  @IsUUID(4)
  id_cidade: string
}