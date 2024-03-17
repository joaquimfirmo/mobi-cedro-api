import { Inject, Service } from 'typedi'
import CompanyRepository from '../../../infrastructure/repositories/company-repository'

@Service('usecase.findAllCompany')
export default class FindAllCompany {
  constructor(
    @Inject('repository.company') readonly companyRepository: CompanyRepository
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
