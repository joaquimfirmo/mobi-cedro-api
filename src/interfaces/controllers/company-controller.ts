import { Inject, Service } from 'typedi'
import { Request, ResponseToolkit } from '@hapi/hapi'
import CreateCompany from '../../application/usecases/company/create-company'

@Service()
export default class CompanyController {
  constructor(
    @Inject('usecase.createCompany')
    private readonly createCompany: CreateCompany
  ) {}

  async create(request: Request, h: ResponseToolkit): Promise<any> {
    const { razaoSocial, nomeFantasia, cnpj } = request.payload as any
    const { companyCreated, message, status } =
      await this.createCompany.execute(razaoSocial, nomeFantasia, cnpj)

    return h.response({ companyCreated, message }).code(status)
  }
}
