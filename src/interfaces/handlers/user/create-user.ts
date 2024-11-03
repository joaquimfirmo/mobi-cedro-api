import { Request, ResponseToolkit } from 'hapi'
import { Container } from 'typedi'
import CreateUser from '../../../application/usecases/user/create-user'

export default async function createUser(
  request: Request,
  h: ResponseToolkit
): Promise<any> {
  const createUser: CreateUser = Container.get(CreateUser)

  const { data, message, status } = await createUser.execute(request.payload)
  return h
    .response({
      data,
      message,
    })
    .code(status)
}
