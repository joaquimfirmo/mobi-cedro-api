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
    try {
      const company: Company = new Company(
        razao_social,
        nome_fantasia,
        cnpj,
        id_cidade
      )

      const cnpjExists = await this.verifyCnpjExist(cnpj)
      if (cnpjExists) {
        return {
          message: 'CNPJ já existe',
          status: 400,
        }
      }

      const razaoSocialExists = await this.verifyRaizSocialExist(razao_social)
      if (razaoSocialExists) {
        return {
          message: 'Razão social já existe',
          status: 400,
        }
      }

      const result = await this.companyRepository.create(company)

      return {
        message: 'Empresa criada com sucesso',
        status: 201,
        companyCreated: result.rows[0],
      }
    } catch (error: any) {
      return {
        message: error.message,
        status: error.message === 'Empresa inválida' ? 400 : 500,
      }
    }
  }

  async verifyCnpjExist(cnpj: string): Promise<boolean> {
    const cnpjExists = await this.companyRepository.findByCnpj(cnpj)
    return cnpjExists.rows?.length > 0 ? true : false
  }

  async verifyRaizSocialExist(razao_social: string): Promise<boolean> {
    const razaoSocialExists =
      await this.companyRepository.findByRazaoSocial(razao_social)
    return razaoSocialExists.rows?.length > 0 ? true : false
  }
}
