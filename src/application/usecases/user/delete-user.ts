import { Service } from 'typedi'
import { InjectRepository } from '../../../infrastructure/di/decorators/inject-repository'
import UserRepository from '../../../infrastructure/repositories/user-repository'
import IUserRepository from '../../repositories/user-repository'

@Service()
export default class DeleteUser {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(id: string): Promise<any> {
    const userExists = await this.userRepository.findById(id)
    if (userExists.rowCount === 0) {
      return {
        data: [],
        message: 'Usuário para exclusão não encontrado',
        status: 404,
      }
    }

    await this.userRepository.delete(id)

    return {
      data: [],
      message: 'Usuário deletado com sucesso',
      status: 200,
    }
  }
}
