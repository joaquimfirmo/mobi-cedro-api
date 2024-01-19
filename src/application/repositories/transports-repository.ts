export default interface ITransportsRepository {
  findAll(): Promise<any>
  findByCity(city: string): Promise<any>
}
