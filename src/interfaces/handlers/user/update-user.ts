import { Request, ResponseToolkit } from 'hapi'
import { Container } from 'typedi'
import UpdateUser from '../../../application/usecases/user/update-user'

export default async function updateUser(
  request: Request,
  h: ResponseToolkit
): Promise<any> {
  const updateUser: UpdateUser = Container.get(UpdateUser)

  const { id } = request.params

  const { data, message, status } = await updateUser.execute(
    id,
    request.payload
  )
  return h
    .response({
      data,
      message,
    })
    .code(status)
}
