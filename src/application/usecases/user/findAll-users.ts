import { Service } from 'typedi'
import { InjectRepository } from '../../../infrastructure/di/decorators/inject-repository'
import UserRepository from '../../../infrastructure/repositories/user-repository'
import IUserRepository from '../../repositories/user-repository'

@Service()
export default class FindAllUsers {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(): Promise<any> {
    const users = await this.userRepository.findAll()

    return {
      data: users,
      message:
        users.rows.length > 0
          ? 'Usuários encontrados com sucesso'
          : 'Nenhum usuário encontrado',
      status: 200,
    }
  }
}
