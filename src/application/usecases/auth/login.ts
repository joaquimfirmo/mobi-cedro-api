import { Inject, Service } from 'typedi'
import { unauthorized } from '@hapi/boom'
import UserRepository from '../../repositories/user-repository'
import Auth from '../../../domain/entities/Auth'

@Service()
export default class Login {
  constructor(
    @Inject('repository.user') readonly userRepository: UserRepository,
    readonly auth: Auth
  ) {}

  public async execute(data: any): Promise<any> {
    const { email, senha } = data
    const user = await this.userRepository.findByEmail(email)
    if (user.rows?.length === 0) {
      throw unauthorized('Usuário ou senha inválidos')
    }

    const isValidPassword = await this.auth.comparePassword(
      senha,
      user.rows[0].senha
    )

    if (!isValidPassword) {
      throw unauthorized('Usuário ou senha inválidos')
    }

    const userId = user.rows[0].id

    return {
      data: {
        token: this.auth.createToken(userId, user.rows[0].permissoes),
        userId: userId,
      },
      message: 'Usuário logado com sucesso',
      status: 200,
    }
  }
}
