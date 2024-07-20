import municipios from './municipios.json'

export function cityIsValid(name: string, uf: string): boolean {
  return municipios.data.some(
    (municipio) => municipio.Nome === name && municipio.Uf === uf
  )
}
