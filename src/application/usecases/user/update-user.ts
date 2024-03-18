import { Inject, Service } from 'typedi'
import UserRepository from '../../repositories/user-repository'
import User from '../../../domain/entities/user'

@Service('usecase.updateUser')
export default class UpdateUser {
  constructor(
    @Inject('repository.user') readonly userRepository: UserRepository
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
