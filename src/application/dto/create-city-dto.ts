import { IsString, IsAlpha, MinLength, MaxLength } from 'class-validator'

export default class CreateCityDto {
  @IsString()
  @MinLength(2, {
    message: 'Nome da cidade deve ter no mínimo 2 caracteres',
  })
  nome: string

  @IsString()
  @IsAlpha()
  @MinLength(2, {
    message: 'UF deve ter no mínimo 2 caracteres',
  })
  @MaxLength(2, {
    message: 'UF deve ter no máximo 2 caracteres',
  })
  uf: string
}
