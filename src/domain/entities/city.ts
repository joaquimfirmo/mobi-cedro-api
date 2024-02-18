import crypto from 'crypto'

export default class City {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly uf: string
  ) {}

  static create(name: string, uf: string): City {
    const cityId = crypto.randomUUID()
    return new City(cityId, name, uf)
  }
}
