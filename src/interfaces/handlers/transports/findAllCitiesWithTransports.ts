import { Request, ResponseToolkit } from 'hapi'
import { Container } from 'typedi'
import FindAllCitiesWithTransports from '../../../application/usecases/transports/findAllCitiesWithTransports'

export default async function findAllCitiesWithTransports(
  request: Request,
  h: ResponseToolkit
): Promise<any> {
  const findAllCitiesWithTransports: FindAllCitiesWithTransports =
    Container.get(FindAllCitiesWithTransports)

  const limit: number = request.query.limit
    ? parseInt(request.query.limit as string)
    : 10
  const offset: number = request.query.offset
    ? parseInt(request.query.offset as string)
    : 0

  const { data, message } = await findAllCitiesWithTransports.execute(
    limit,
    offset
  )

  return h
    .response({
      message,
      data,
    })
    .code(200)
}
