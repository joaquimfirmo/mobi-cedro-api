export default interface IBGEServiceInterface {
  getCitiesByState(uf: string): Promise<any>
}
