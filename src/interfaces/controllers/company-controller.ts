import { Inject, Service } from 'typedi'
import { Request, ResponseToolkit } from '@hapi/hapi'
import CreateCompany from '../../application/usecases/company/create-company'
import FindAllCompany from '../../application/usecases/company/findAll-company'

@Service()
export default class CompanyController {
  constructor(
    @Inject('usecase.createCompany')
    private readonly createCompany: CreateCompany,
    @Inject('usecase.findAllCompany')
    private readonly findAllCompany: FindAllCompany
  ) {}

  async create(request: Request, h: ResponseToolkit): Promise<any> {
    const { razaoSocial, nomeFantasia, cnpj } = request.payload as any
    const { companyCreated, message, status } =
      await this.createCompany.execute(razaoSocial, nomeFantasia, cnpj)

    return h.response({ companyCreated, message }).code(status)
  }

  async getAll(request: Request, h: ResponseToolkit): Promise<any> {
    const { limit, offset } = request.query as any
    const result = await this.findAllCompany.execute(limit, offset)
    return h.response(result).code(200)
  }
}
