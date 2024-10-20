import { Container } from 'typedi'
import { Request, ResponseToolkit } from 'hapi'
import FindAllCompany from '../../../application/usecases/company/findAll-company'

export async function findAllCompany(
  request: Request,
  h: ResponseToolkit
): Promise<any> {
  const findAllCompany: FindAllCompany = Container.get(FindAllCompany)

  const { limit, offset } = request.query as any

  const { data, message, status } = await findAllCompany.execute(limit, offset)

  return h
    .response({
      data,
      message,
    })
    .code(status)
}
