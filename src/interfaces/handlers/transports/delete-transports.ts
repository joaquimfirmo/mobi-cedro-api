import { Request, ResponseToolkit } from 'hapi'
import { Container } from 'typedi'
import DeleteTransport from '../../../application/usecases/transports/deleteTransport'

export default async function deleteTransport(
  request: Request,
  h: ResponseToolkit
): Promise<any> {
  const { id } = request.params

  const deleteTransport: DeleteTransport = Container.get(DeleteTransport)

  const { data, message, status } = await deleteTransport.execute(id)
  return h
    .response({
      data,
      message,
    })
    .code(status)
}
