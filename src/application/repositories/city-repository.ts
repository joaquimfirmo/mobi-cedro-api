import City from '../../domain/entities/city'

export default interface ICityRepository {
  create(city: City): Promise<any>
  findAll(limit: number, offset: number): Promise<any>
  findById(id: string): Promise<any>
  findByNameAndUf(city: City): Promise<any>
  update(id: string, city: any): Promise<any>
  delete(id: string): Promise<any>
}
