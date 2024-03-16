import { Inject, Service } from 'typedi'
import { Request, ResponseToolkit } from '@hapi/hapi'
import CreateCompany from '../../application/usecases/company/create-company'
import FindAllCompany from '../../application/usecases/company/findAll-company'
import UpdateCompany from '../../application/usecases/company/update-company'
import DeleteCompany from '../../application/usecases/company/delete-company'

@Service()
export default class CompanyController {
  constructor(
    @Inject('usecase.createCompany')
    private readonly createCompany: CreateCompany,
    @Inject('usecase.findAllCompany')
    private readonly findAllCompany: FindAllCompany,
    @Inject('usecase.updateCompany')
    private readonly updateCompany: UpdateCompany,
    @Inject('usecase.deleteCompany')
    private readonly deleteCompany: DeleteCompany
  ) {}

  async create(request: Request, h: ResponseToolkit): Promise<any> {
    const { razao_social, nome_fantasia, cnpj, id_cidade } =
      request.payload as any
    const { companyCreated, message, status } =
      await this.createCompany.execute(
        razao_social,
        nome_fantasia,
        cnpj,
        id_cidade
      )

    return h
      .response({
        companyCreated,
        message,
      })
      .code(status)
  }

  async getAll(request: Request, h: ResponseToolkit): Promise<any> {
    const { limit, offset } = request.query as any
    const result = await this.findAllCompany.execute(limit, offset)
    return h.response(result).code(200)
  }

  async update(request: Request, h: ResponseToolkit): Promise<any> {
    const id = request.params.id
    const { companyUpdated, message, status } =
      await this.updateCompany.execute(id, request.payload)

    return h
      .response({
        companyUpdated,
        message,
      })
      .code(status)
  }

  async delete(request: Request, h: ResponseToolkit): Promise<any> {
    const id = request.params.id
    const { message, status, data } = await this.deleteCompany.execute(id)

    return h
      .response({
        message,
        data,
      })
      .code(status)
  }
}
