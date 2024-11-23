export default interface IBGEServiceInterface {
  getCitiesByState(uf: string): Promise<any>
  getCityByCode(code: number): Promise<any>
}
