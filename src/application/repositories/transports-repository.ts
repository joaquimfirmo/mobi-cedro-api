export default interface ITransportsRepository {
  create(data: any): Promise<any>
  findAll(): Promise<any>
  findByCity(city: string): Promise<any>
  findById(id: string): Promise<any>
  update(id: string, data: any): Promise<any>
  findTransport(data: any): Promise<any>
}
