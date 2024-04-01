import { Inject, Service } from 'typedi'
import CompanyRepository from '../../repositories/company-repository'

@Service()
export default class DeleteCompany {
  constructor(
    @Inject('repository.company')
    readonly companyRepository: CompanyRepository
  ) {}

  async execute(id: string): Promise<any> {
    const companyExists = await this.companyRepository.findById(id)

    if (companyExists.rowCount === 0) {
      return {
        data: [],
        message: 'Empresa para exclusão não encontrada',
        status: 404,
      }
    }

    await this.companyRepository.delete(id)

    return {
      data: id,
      message: 'Empresa excluída com sucesso!',
      status: 200,
    }
  }
}
