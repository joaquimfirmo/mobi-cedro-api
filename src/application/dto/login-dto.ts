import { IsEmail, IsString, MinLength, IsStrongPassword } from 'class-validator'

export default class LoginDto {
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
}
