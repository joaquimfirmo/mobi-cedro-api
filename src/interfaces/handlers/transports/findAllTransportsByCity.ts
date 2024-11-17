import { Request, ResponseToolkit } from 'hapi'
import { Container } from 'typedi'
import findAllTransportsByCity from '../../../application/usecases/transports/findAllTransportsByCity'

export default async function findTransportsByCity(
  request: Request,
  h: ResponseToolkit
): Promise<any> {
  const getAllTransportsByCity: findAllTransportsByCity = Container.get(
    findAllTransportsByCity
  )
  const { id } = request.params

  const { data, message, status } = await getAllTransportsByCity.execute(id)

  return h
    .response({
      data,
      message,
    })
    .code(status)
}
