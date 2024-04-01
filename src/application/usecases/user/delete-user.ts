import { Inject, Service } from 'typedi'
import UserRepository from '../../repositories/user-repository'

@Service()
export default class DeleteUser {
  constructor(
    @Inject('repository.user') readonly userRepository: UserRepository
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
