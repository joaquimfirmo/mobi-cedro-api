import { Service } from 'typedi'
import { Request, ResponseToolkit } from 'hapi'
import CreateUser from '../../application/usecases/user/create-user'
import FindAllUsers from '../../application/usecases/user/findAll-users'
import UpdateUser from '../../application/usecases/user/update-user'
import DeleteUser from '../../application/usecases/user/delete-user'
import Login from '../../application/usecases/auth/login'

@Service()
export default class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly findAllUsers: FindAllUsers,
    private readonly updateUser: UpdateUser,
    private readonly deleteUser: DeleteUser,
    private readonly authenticate: Login
  ) {}

  async create(request: Request, h: ResponseToolkit): Promise<any> {
    const { data, message, status } = await this.createUser.execute(
      request.payload
    )
    return h
      .response({
        data,
        message,
      })
      .code(status)
  }

  async findAll(request: Request, h: ResponseToolkit): Promise<any> {
    const { data, message, status } = await this.findAllUsers.execute()
    return h
      .response({
        data,
        message,
      })
      .code(status)
  }

  async update(request: Request, h: ResponseToolkit): Promise<any> {
    const { data, message, status } = await this.updateUser.execute(
      request.params.id,
      request.payload
    )
    return h
      .response({
        data,
        message,
      })
      .code(status)
  }

  async delete(request: Request, h: ResponseToolkit): Promise<any> {
    const { message, status } = await this.deleteUser.execute(request.params.id)
    return h
      .response({
        message,
      })
      .code(status)
  }

  async login(request: Request, h: ResponseToolkit): Promise<any> {
    const { data, message, status } = await this.authenticate.execute(
      request.payload
    )
    return h
      .response({
        data,
        message,
      })
      .code(status)
  }
}
