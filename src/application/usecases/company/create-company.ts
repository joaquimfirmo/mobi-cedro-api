import { Inject, Service } from 'typedi'
import Company from '../../../domain/entities/company'
import CompanyRepository from '../../repositories/company-repository'

@Service('usecase.createCompany')
export default class CreateCompany {
  constructor(
    @Inject('repository.company') readonly companyRepository: CompanyRepository
  ) {}
  async execute(
    razaoSocial: string,
    nomeFantasia: string,
    cnpj: string
  ): Promise<any> {
    const company: Company = Company.create(razaoSocial, nomeFantasia, cnpj)
    const result = await this.companyRepository.create(company)
    if (result.rowCount === 0 || result instanceof Error) {
      return {
        message: 'Não foi possível criar a empresa',
        status: 400,
        companyCreated: null,
      }
    }

    return {
      message: 'Empresa criada com sucesso',
      status: 201,
      companyCreated: result.rows[0],
    }
  }
}
