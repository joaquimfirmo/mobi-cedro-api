import { Service } from 'typedi'
import { InjectRepository } from '../../../infrastructure/di/decorators/inject-repository'
import CompanyRepository from '../../../infrastructure/repositories/company-repository'
import ICompanyRepository from '../../../application/repositories/company-repository'

@Service()
export default class FindAllCompany {
  constructor(
    @InjectRepository(CompanyRepository)
    readonly companyRepository: ICompanyRepository
  ) {}

  async execute(limit: number, offset: number) {
    const result = await this.companyRepository.findAll(limit, offset)

    return {
      data: result,
      message: 'Empresas encontradas com sucesso',
      status: 200,
    }
  }
}
