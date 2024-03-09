import crypto from 'crypto'
import municipios from './../../utils/municipios.json'

export default class City {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly uf: string
  ) {}

  static create(name: string, uf: string): City {
    if (!this.validadeCity(name, uf)) {
      throw new Error('Cidade inválida')
    }
    const cityId = crypto.randomUUID()
    return new City(cityId, name, uf)
  }

  private static validadeCity(name: string, uf: string): boolean {
    const city = municipios.data.find(
      (municipio) => municipio.Nome === name && municipio.Uf === uf
    )
    return !!city
  }
}
