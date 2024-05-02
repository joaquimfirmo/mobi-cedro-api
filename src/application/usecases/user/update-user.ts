import { Service } from 'typedi'
import { InjectRepository } from '../../../infrastructure/di/decorators/inject-repository'
import UserRepository from '../../../infrastructure/repositories/user-repository'
import IUserRepository from '../../repositories/user-repository'
import User from '../../../domain/entities/user'

@Service()
export default class UpdateUser {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(id: string, user: any): Promise<any> {
    const userExists = await this.userRepository.findById(id)
    if (userExists.rowCount === 0) {
      return {
        data: [],
        message: 'Usuário não encontrado',
        status: 404,
      }
    }

    const result = await this.userRepository.update(
      id,
      new User(user.nome, user.email, user.permissoes, id)
    )

    return {
      data: result.rows[0],
      message: 'Usuário atualizado com sucesso',
      status: 200,
    }
  }
}
