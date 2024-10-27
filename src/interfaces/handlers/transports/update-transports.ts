import { Request, ResponseToolkit } from 'hapi'
import { Container } from 'typedi'
import UpdateTransport from '../../../application/usecases/transports/updateTransport'

export default async function updateTransport(
  request: Request,
  h: ResponseToolkit
): Promise<any> {
  const { id } = request.params

  const updateTransport: UpdateTransport = Container.get(UpdateTransport)

  const { data, message, status } = await updateTransport.execute(
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
