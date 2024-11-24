export default interface IBGEClientInterface {
  getCitiesByState(uf: string): Promise<any[]>
  getCityByCode(code: number): Promise<any>
  isValidCity(city: string, code: number): Promise<any>
}
