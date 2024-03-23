import { IsString, MinLength, MaxLength, IsEnum } from 'class-validator'

export default class UpdateUserDto {
  @IsString()
  @MinLength(2, { message: 'Nome deve ter no mínimo 2 caracteres' })
  @MaxLength(50, {
    message: 'Nome deve ter no máximo 50 caracteres',
  })
  nome: string

  @IsString()
  @IsEnum(['SUPER_ADMIN', 'ADMIN', 'USER', 'GUEST'], {
    message: 'Permissão inválida',
  })
  permissoes: string
}
