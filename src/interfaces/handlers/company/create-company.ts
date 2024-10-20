import { Container } from 'typedi'
import { Request, ResponseToolkit } from 'hapi'
import CreateCompany from '../../../application/usecases/company/create-company'

export async function createCompany(
  request: Request,
  h: ResponseToolkit
): Promise<any> {
  const createCompany: CreateCompany = Container.get(CreateCompany)

  const { razao_social, nome_fantasia, cnpj, id_cidade } =
    request.payload as any
  const { data, message, status } = await createCompany.execute(
    razao_social,
    nome_fantasia,
    cnpj,
    id_cidade
  )

  return h
    .response({
      data,
      message,
    })
    .code(status)
}
