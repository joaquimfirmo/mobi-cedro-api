import City from '../../domain/entities/city'

export default interface ICityRepository {
  create(city: City): Promise<any>
  findAll(): Promise<any>
}
