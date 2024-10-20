import { Container } from 'typedi'
import { Request, ResponseToolkit } from 'hapi'
import DeleteCompany from '../../../application/usecases/company/delete-company'

export async function deleteCompany(
  request: Request,
  h: ResponseToolkit
): Promise<any> {
  const deleteCompany: DeleteCompany = Container.get(DeleteCompany)

  const id = request.params.id

  const { data, message, status } = await deleteCompany.execute(id)

  return h
    .response({
      data,
      message,
    })
    .code(status)
}
