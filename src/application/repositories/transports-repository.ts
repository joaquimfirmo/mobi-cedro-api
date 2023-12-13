export default interface ITransportsRepository {
  list(): Promise<any>
  findByCity(city: string): Promise<any>
}
