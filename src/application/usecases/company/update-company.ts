import { Inject, Service } from 'typedi'
import CompanyRepository from '../../../infrastructure/repositories/company-repository'

@Service('usecase.updateCompany')
export default class UpdateCompany {
  constructor(
    @Inject('repository.company')
    readonly companyRepository: CompanyRepository
  ) {}

  async execute(id: string, company: any): Promise<any> {
    try {
      const companyExists = await this.companyRepository.findById(id)
      if (companyExists.rowCount === 0) {
        return {
          message: 'Empresa não encontrada',
          status: 404,
          company: [],
        }
      }

      const companyUpdated = await this.companyRepository.update(id, company)
      return {
        message: 'Empresa atualizada com sucesso',
        status: 200,
        companyUpdated: companyUpdated.rows[0],
      }
    } catch (error) {
      return {
        message: 'Erro ao atualizar empresa',
        status: 500,
        company: [],
      }
    }
  }
}
