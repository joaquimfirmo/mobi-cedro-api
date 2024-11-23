import { Container } from 'typedi'
import { Request, ResponseToolkit } from 'hapi'
import CitiesByState from '../../../application/usecases/locations/citiesByState'

export default async function findAllCitiesByState(
  request: Request,
  h: ResponseToolkit
): Promise<any> {
  const uf = request.params.uf

  const citiesByState: CitiesByState = Container.get(CitiesByState)

  const { data, message, status } = await citiesByState.execute(uf)

  return h
    .response({
      message,
      data,
    })
    .code(status)
}
