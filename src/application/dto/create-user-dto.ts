import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsEnum,
  IsStrongPassword,
} from 'class-validator'

export default class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Nome deve ter no mínimo 2 caracteres' })
  @MaxLength(50, {
    message: 'Nome deve ter no máximo 50 caracteres',
  })
  nome: string

  @IsEmail({}, { message: 'Email inválido' })
  email: string

  @IsString()
  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Senha fraca. Senha deve conter pelo menos 8 caracteres, 1 letra minúscula, 1 letra maiúscula, 1 número e 1 símbolo',
    }
  )
  senha: string

  @IsString()
  @IsEnum(['SUPER_ADMIN', 'ADMIN', 'USER', 'GUEST'], {
    message: 'Permissão inválida',
  })
  permissoes: string
}
