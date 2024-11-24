import crypto from 'crypto'
import { IsString, MinLength, MaxLength, IsInt } from 'class-validator'

export default class City {
  @IsString()
  public readonly id: string
  @IsString()
  @MinLength(2)
  public readonly nome: string
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  public readonly uf: string
  @IsInt()
  public readonly cod_ibge: number

  constructor(id: string, nome: string, uf: string, cod_ibge: number) {
    this.id = id
    this.nome = nome
    this.uf = uf
    this.cod_ibge = cod_ibge
  }

  static create(nome: string, uf: string, cod_ibge: number): City {
    const id = crypto.randomUUID()
    return new City(id, nome, uf, cod_ibge)
  }
}
