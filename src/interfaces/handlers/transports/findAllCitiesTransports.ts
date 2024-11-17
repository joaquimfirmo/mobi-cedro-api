import { Request, ResponseToolkit } from 'hapi'
import { Container } from 'typedi'
import FindAllCitiesTransports from '../../../application/usecases/transports/findAllCitiesTransports'

export default async function findAllCitiesTransports(
  request: Request,
  h: ResponseToolkit
): Promise<any> {
  const findAllCitiesTransports: FindAllCitiesTransports = Container.get(
    FindAllCitiesTransports
  )

  const limit: number = request.query.limit
    ? parseInt(request.query.limit as string)
    : 10
  const offset: number = request.query.offset
    ? parseInt(request.query.offset as string)
    : 0

  const { data, message } = await findAllCitiesTransports.execute(limit, offset)

  return h
    .response({
      message,
      data,
    })
    .code(200)
}
