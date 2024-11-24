export default interface CityServiceInterface {
  isValidCity(city: string, code: number): Promise<any>
  findOrCreateCity(city: string, uf: string, code: number): Promise<any>
}
