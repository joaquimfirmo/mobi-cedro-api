import { Inject, Service } from 'typedi'
import CompanyRepository from '../../../infrastructure/repositories/company-repository'

@Service('usecase.updateCompany')
export default class UpdateCompany {
  constructor(
    @Inject('repository.company')
    readonly companyRepository: CompanyRepository
  ) {}

  async execute(id: string, company: any): Promise<any> {
    const companyExists = await this.companyRepository.findById(id)
    if (companyExists.rowCount === 0) {
      return {
        message: 'Empresa não encontrada',
        status: 404,
        company: [],
      }
    }

    const result = await this.companyRepository.update(id, company)

    if (result instanceof Error) {
      return {
        message: result.message,
        status: 500,
      }
    }
    return {
      message: 'Empresa atualizada com sucesso',
      status: 200,
      companyUpdated: result.rows[0],
    }
  }
}
