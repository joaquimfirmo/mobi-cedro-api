import { Service } from 'typedi'
import { InjectRepository } from '../../../infrastructure/di/decorators/inject-repository'
import UserRepository from '../../../infrastructure/repositories/user-repository'
import IUserRepository from '../../repositories/user-repository'
import User from '../../../domain/entities/user'
import createHashs from '../../../utils/createHashs'

@Service()
export default class CreateUser {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(data: any): Promise<any> {
    data.senha = await this.hashPassword(data.senha)
    const user = new User(data.nome, data.email, data.permissoes, data.senha)

    const emailAlreadyExists = await this.userRepository.findByEmail(user.email)

    if (emailAlreadyExists.rows?.length > 0) {
      return {
        data: [],
        message: 'Email já cadastrado',
        status: 400,
      }
    }

    await this.userRepository.create(user)

    return {
      data: {
        nome: user.name,
        email: user.email,
        permissoes: user.permissions,
      },
      message: 'Usuário criado com sucesso',
      status: 201,
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return createHashs.createHashPassword(password)
  }
}
