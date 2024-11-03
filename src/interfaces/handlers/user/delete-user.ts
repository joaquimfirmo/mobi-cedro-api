import { Request, ResponseToolkit } from 'hapi'
import { Container } from 'typedi'
import DeleteUser from '../../../application/usecases/user/delete-user'

export default async function deleteUser(
  request: Request,
  h: ResponseToolkit
): Promise<any> {
  const deleteUser: DeleteUser = Container.get(DeleteUser)

  const { id } = request.params

  const { data, message, status } = await deleteUser.execute(id)
  return h
    .response({
      data,
      message,
    })
    .code(status)
}
