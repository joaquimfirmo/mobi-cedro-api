import User from '../../domain/entities/user'

export default interface IUserRepository {
  create(user: User): Promise<any>
  findAll(): Promise<any>
  findById(id: string): Promise<any>
  findByNameAndEmail(name: string, email: string): Promise<any>
  findByEmail(email: string): Promise<any>
  update(id: string, user: any): Promise<any>
  delete(id: string): Promise<any>
}
