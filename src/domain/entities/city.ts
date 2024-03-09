import crypto from 'crypto'
import municipios from './../../utils/municipios.json'

export default class City {
  private readonly id: string
  private readonly name: string
  private readonly uf: string

  constructor(name: string, uf: string) {
    this.id = crypto.randomUUID()
    this.name = name
    this.uf = uf
    this.validateCity(name, uf)
  }

  validateCity(name: string, uf: string): void {
    const city = municipios.data.find(
      (municipio) => municipio.Nome === name && municipio.Uf === uf
    )
    if (!city) {
      throw new Error('Cidade inválida')
    }
  }
}
