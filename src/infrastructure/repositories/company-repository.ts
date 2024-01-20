import { Service } from 'typedi'
import ICompanyRepository from '../../application/repositories/company-repository'
import Company from '../../domain/entities/company'

@Service('repository.company')
export default class CompanyRepository implements ICompanyRepository {
  constructor(private readonly connection: any) {}

  async create(company: Company): Promise<any> {
    try {
      const result = await this.connection.execute(
        `INSERT INTO empresas (id, razao_social, nome_fantasia, cnpj)
         VALUES ($1, $2, $3, $4) RETURNING id, nome_fantasia`,
        [company.id, company.razaoSocial, company.nomeFantasia, company.cnpj]
      )
      return result
    } catch (error) {
      return error
    }
  }
}
