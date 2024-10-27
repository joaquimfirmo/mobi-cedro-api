import { Request, ResponseToolkit } from 'hapi'
import { Container } from 'typedi'
import CreateTransport from '../../../application/usecases/transports/createTransport'

export default async function createTransport(
  request: Request,
  h: ResponseToolkit
): Promise<any> {
  const createTransport: CreateTransport = Container.get(CreateTransport)

  const { data, message, status } = await createTransport.execute(
    request.payload
  )
  return h
    .response({
      data,
      message,
    })
    .code(status)
}
