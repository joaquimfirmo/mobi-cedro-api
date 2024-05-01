import { Service } from 'typedi'
import { InjectRepository } from '../../../infrastructure/di/decorators/inject-repository'
import CompanyRepository from '../../../infrastructure/repositories/company-repository'
import ICompanyRepository from '../../../application/repositories/company-repository'

@Service()
export default class UpdateCompany {
  constructor(
    @InjectRepository(CompanyRepository)
    readonly companyRepository: ICompanyRepository
  ) {}

  async execute(id: string, company: any): Promise<any> {
    const companyExists = await this.companyRepository.findById(id)
    if (companyExists.rowCount === 0) {
      return {
        data: [],
        message: 'Empresa não encontrada',
        status: 404,
      }
    }

    const result = await this.companyRepository.update(id, company)

    return {
      data: result.rows[0],
      message: 'Empresa atualizada com sucesso',
      status: 200,
    }
  }
}
