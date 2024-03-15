import { IsUUID } from 'class-validator'

export default class ParamDto {
  @IsUUID(4, { message: 'Id inválido' })
  id: string
}
