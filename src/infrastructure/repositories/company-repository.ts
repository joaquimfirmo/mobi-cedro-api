import ICompanyRepository from '../../application/repositories/company-repository'
import Company from '../../domain/entities/company'

export default class CompanyRepository implements ICompanyRepository {
  constructor(private readonly connection: any) {}

  async create(company: Company): Promise<any> {
    try {
      const result = await this.connection.execute(
        `INSERT INTO empresas (id, nome_fantasia,razao_social, cnpj,id_cidade)
         VALUES ($1, $2, $3, $4, $5) RETURNING id, nome_fantasia`,
        [
          company.id,
          company.nomeFantasia,
          company.razaoSocial,
          company.cnpj,
          company.idCidade,
        ]
      )
      return result
    } catch (error) {
      return error
    }
  }

  async findAll(limit: number = 20, offset: number = 0): Promise<any> {
    try {
      const result = await this.connection.execute(
        `SELECT * FROM "empresas" LIMIT $1 OFFSET $2`,
        [limit, offset]
      )
      return result
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
