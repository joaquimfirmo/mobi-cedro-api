import { Request, ResponseToolkit } from 'hapi'
import { Container } from 'typedi'
import Login from '../../../application/usecases/auth/login'

export default async function loginUser(
  request: Request,
  h: ResponseToolkit
): Promise<any> {
  const loginUser: Login = Container.get(Login)

  const { data, message, status } = await loginUser.execute(request.payload)
  return h
    .response({
      data,
      message,
    })
    .code(status)
}
