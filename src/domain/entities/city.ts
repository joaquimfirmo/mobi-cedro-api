import crypto from 'crypto'
import { IsString, MinLength, MaxLength } from 'class-validator'

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

  constructor(id: string, nome: string, uf: string) {
    this.id = id
    this.nome = nome
    this.uf = uf
  }

  static create(nome: string, uf: string): City {
    const id = crypto.randomUUID()
    return new City(id, nome, uf)
  }
}
