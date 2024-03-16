import crypto from 'crypto'
import municipios from './../../utils/municipios.json'
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

  constructor(nome: string, uf: string) {
    this.id = crypto.randomUUID()
    this.nome = nome
    this.uf = uf
    this.validateCity(nome, uf)
  }

  validateCity(nome: string, uf: string): void {
    const city = municipios.data.find(
      (municipio) => municipio.Nome === nome && municipio.Uf === uf
    )
    if (!city) {
      throw new Error('Cidade inválida')
    }
  }
}
