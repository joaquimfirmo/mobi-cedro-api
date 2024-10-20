import { Container } from 'typedi'
import { Request, ResponseToolkit } from 'hapi'
import UpdateCompany from '../../../application/usecases/company/update-company'

export async function updateCompany(
  request: Request,
  h: ResponseToolkit
): Promise<any> {
  const updateCompany: UpdateCompany = Container.get(UpdateCompany)

  const id = request.params.id
  const { data, message, status } = await updateCompany.execute(
    id,
    request.payload
  )

  return h
    .response({
      data,
      message,
    })
    .code(status)
}
