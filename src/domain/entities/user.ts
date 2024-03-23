import crypto from 'crypto'
import {
  IsString,
  MinLength,
  MaxLength,
  IsUUID,
  IsEmail,
  IsEnum,
} from 'class-validator'
export default class User {
  @IsUUID(4)
  public readonly id: string

  @IsString()
  @MinLength(2, { message: 'Nome deve ter no mínimo 2 caracteres' })
  @MaxLength(50, {
    message: 'Nome deve ter no máximo 50 caracteres',
  })
  public readonly name: string

  @IsEmail({}, { message: 'Email inválido' })
  public readonly email: string

  @IsString()
  @MinLength(8, { message: 'Senha deve ter no mínimo 6 caracteres' })
  public readonly password!: string

  @IsString()
  @IsEnum(['SUPER_ADMIN', 'ADMIN', 'USER', 'GUEST'], {
    message: 'Permissão inválida',
  })
  public readonly permissions: string

  constructor(
    name: string,
    email: string,
    permissions: string,
    password?: string,
    id?: string
  ) {
    this.id = id || crypto.randomUUID()
    this.name = name
    this.email = email
    this.password = password || ''
    this.permissions = permissions
  }
}
