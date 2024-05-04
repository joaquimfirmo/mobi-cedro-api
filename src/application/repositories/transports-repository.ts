export default interface ITransportsRepository {
  create(data: any): Promise<any>
  findAll(limit: number, offset: number): Promise<any>
  findByCity(city: string): Promise<any>
  findById(id: string): Promise<any>
  update(id: string, data: any): Promise<any>
  findByHash(hash: string): Promise<any>
  delete(id: string): Promise<any>
}
