/* eslint-disable no-useless-escape */
import {
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  Matches,
  IsUUID,
} from 'class-validator'
import { IsValidForeignKey } from '../../utils/decorators/validators/foreignkey-validation'

export default class CreateTransportsDto {
  @MinLength(2, {
    message: 'Nome da cidade deve ter no mínimo 2 caracteres',
  })
  @MaxLength(50, {
    message: 'Nome da cidade deve ter no máximo 50 caracteres',
  })
  cidade_origem: string

  @MinLength(2, {
    message: 'Nome da cidade deve ter no mínimo 2 caracteres',
  })
  @MaxLength(50, {
    message: 'Nome da cidade deve ter no máximo 50 caracteres',
  })
  cidade_destino: string

  @IsString()
  @IsEnum([
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ])
  dia_semana: string

  @IsString()
  @MinLength(5, {
    message: 'Localização deve ter no mínimo 5 caracteres',
  })
  @MaxLength(100, {
    message: 'Localização deve ter no máximo 100 caracteres',
  })
  localizacao: string

  @IsString()
  @Matches(/^([0-9]{2})\:([0-9]{2})\:([0-9]{2})$/)
  hora_saida: string

  @IsString()
  @Matches(/^([0-9]{2})\:([0-9]{2})\:([0-9]{2})$/)
  hora_chegada: string

  @IsString()
  @Matches(/^\$\d+(?:\.\d{0,2})$/)
  preco: string

  @IsUUID(4)
  @IsValidForeignKey(
    {
      tableName: 'empresas',
    },
    {
      message: 'Empresa $value informada não existe no banco de dados',
    }
  )
  id_empresa: string

  @IsUUID(4)
  @IsValidForeignKey(
    {
      tableName: 'veiculos',
    },
    {
      message: 'Veículo $value informado não existe no banco de dados',
    }
  )
  id_veiculo: string

  @IsUUID(4)
  @IsValidForeignKey(
    {
      tableName: 'cidades',
    },
    {
      message: 'Cidade $value informada não existe no banco de dados',
    }
  )
  id_cidade: string
}
