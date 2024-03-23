import { Inject, Service } from 'typedi'
import UserRepository from '../../repositories/user-repository'

@Service('usecase.findAllUsers')
export default class FindAllUsers {
  constructor(
    @Inject('repository.user') readonly userRepository: UserRepository
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
