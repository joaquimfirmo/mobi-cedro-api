import { IsUUID } from 'class-validator'

export default class ParamDto {
  @IsUUID(4, { message: 'Id é um UUID-V4 inválido' })
  id: string
}
