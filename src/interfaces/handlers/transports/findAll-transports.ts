import { Request, ResponseToolkit } from 'hapi'
import { Container } from 'typedi'
import FindAllTransports from '../../../application/usecases/transports/findAllTransports'

export default async function findAllTransports(
  request: Request,
  h: ResponseToolkit
): Promise<any> {
  const findAllTransports: FindAllTransports = Container.get(FindAllTransports)

  const { limit, offset } = request.query as any

  const { data, message, status } = await findAllTransports.execute(
    limit,
    offset
  )

  return h
    .response({
      data,
      message,
    })
    .code(status)
}
