import { Container } from 'typedi'
import { Request, ResponseToolkit } from 'hapi'
import FindAllState from '../../../application/usecases/state/findAll-state'

export async function findAllState(
  request: Request,
  h: ResponseToolkit
): Promise<any> {
  const findAllState: FindAllState = Container.get(FindAllState)

  const { data, message, status } = findAllState.execute()

  return h
    .response({
      data,
      message,
    })
    .code(status)
}
