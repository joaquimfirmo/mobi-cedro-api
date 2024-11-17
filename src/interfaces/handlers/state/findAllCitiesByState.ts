import { Container } from 'typedi'
import { Request, ResponseToolkit } from 'hapi'
import FindCitiesByState from '../../../application/usecases/state/findAllCitiesByState'

export default async function findAllCitiesByState(
  request: Request,
  h: ResponseToolkit
): Promise<any> {
  const uf = request.params.uf

  const findCitiesByState: FindCitiesByState = Container.get(FindCitiesByState)

  const { data, message, status } = await findCitiesByState.execute(uf)

  return h
    .response({
      message,
      data,
    })
    .code(status)
}
