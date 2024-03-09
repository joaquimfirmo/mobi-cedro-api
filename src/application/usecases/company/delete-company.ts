import { Inject, Service } from 'typedi'
import CompanyRepository from '../../repositories/company-repository'

@Service('usecase.deleteCompany')
export default class DeleteCompany {
  constructor(
    @Inject('repository.company')
    readonly companyRepository: CompanyRepository
  ) {}

  async execute(id: string): Promise<any> {
    const companyExists = await this.companyRepository.findById(id)
    if (companyExists.rowCount === 0) {
      return {
        message: 'Empresa para exclusão não encontrada',
        status: 404,
        data: [],
      }
    }

    const result = await this.companyRepository.delete(id)

    if (result instanceof Error) {
      return {
        message: result.message,
        status: 500,
      }
    }

    return {
      message: 'Empresa excluída com sucesso!',
      status: 200,
      data: id,
    }
  }
}
