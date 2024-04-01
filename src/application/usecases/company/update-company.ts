import { Inject, Service } from 'typedi'
import CompanyRepository from '../../../infrastructure/repositories/company-repository'

@Service()
export default class UpdateCompany {
  constructor(
    @Inject('repository.company')
    readonly companyRepository: CompanyRepository
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
