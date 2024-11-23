import { Container } from 'typedi'
import { Request, ResponseToolkit } from 'hapi'
import States from '../../../application/usecases/locations/states'

export default async function findAllState(
  request: Request,
  h: ResponseToolkit
): Promise<any> {
  const states: States = Container.get(States)

  const { data, message, status } = states.execute()

  return h
    .response({
      message,
      data,
    })
    .code(status)
}
