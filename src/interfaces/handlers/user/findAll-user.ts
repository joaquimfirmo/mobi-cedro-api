import { Request, ResponseToolkit } from 'hapi'
import { Container } from 'typedi'
import FindAllUsers from '../../../application/usecases/user/findAll-users'

export default async function findAllUsers(
  request: Request,
  h: ResponseToolkit
): Promise<any> {
  const findAllUsers: FindAllUsers = Container.get(FindAllUsers)

  const { data, message, status } = await findAllUsers.execute()
  return h
    .response({
      data,
      message,
    })
    .code(status)
}
