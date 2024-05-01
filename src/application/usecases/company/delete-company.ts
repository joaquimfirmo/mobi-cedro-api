import { Service } from 'typedi'
import { InjectRepository } from '../../../infrastructure/di/decorators/inject-repository'
import CompanyRepository from '../../../infrastructure/repositories/company-repository'
import ICompanyRepository from '../../../application/repositories/company-repository'

@Service()
export default class DeleteCompany {
  constructor(
    @InjectRepository(CompanyRepository)
    readonly companyRepository: ICompanyRepository
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
