import { Inject, Service } from 'typedi'
import Company from '../../../domain/entities/company'
import CompanyRepository from '../../repositories/company-repository'

@Service('usecase.createCompany')
export default class CreateCompany {
  constructor(
    @Inject('repository.company') readonly companyRepository: CompanyRepository
  ) {}
  async execute(
    razao_social: string,
    nome_fantasia: string,
    cnpj: string,
    id_cidade: string
  ): Promise<any> {
    const company: Company = new Company(
      razao_social,
      nome_fantasia,
      cnpj,
      id_cidade
    )
    const result = await this.companyRepository.create(company)
    if (result instanceof Error) {
      return {
        message: result.message,
        status: 500,
      }
    }

    return {
      message: 'Empresa criada com sucesso',
      status: 201,
      companyCreated: result.rows[0],
    }
  }
}
