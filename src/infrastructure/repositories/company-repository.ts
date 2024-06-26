import { badImplementation } from '@hapi/boom'
import Connection from '../database/connection'
import ICompanyRepository from '../../application/repositories/company-repository'
import ICache from '../../application/cache/cache'
import Company from '../../domain/entities/company'

export default class CompanyRepository implements ICompanyRepository {
  constructor(
    private readonly connection: Connection,
    private readonly cache?: ICache
  ) {}

  async create(company: Company): Promise<any> {
    try {
      const result = await this.connection.execute(
        `INSERT INTO empresas (id, nome_fantasia, razao_social, cnpj, id_cidade)
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
      console.log(error)
      throw badImplementation('Erro ao criar empresa')
    }
  }

  async update(id: string, company: any): Promise<any> {
    try {
      const result = await this.connection.execute(
        `UPDATE 
        empresas 
      SET 
        nome_fantasia = $1, 
        razao_social = $2, 
        cnpj = $3, 
        id_cidade = $4,
        updated_at = NOW() 
      where 
        id = $5 
      RETURNING id, nome_fantasia`,
        [
          company.nome_fantasia,
          company.razao_social,
          company.cnpj,
          company.id_cidade,
          id,
        ]
      )
      return result
    } catch (error) {
      console.log(error)
      throw badImplementation('Erro ao atualizar empresa')
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
      throw badImplementation('Erro ao buscar empresas')
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const result = await this.connection.execute(
        `SELECT * FROM "empresas" WHERE id = $1`,
        [id]
      )
      return result
    } catch (error) {
      console.log(error)
      throw badImplementation('Erro ao buscar empresa por id')
    }
  }

  async findByCnpj(cnpj: string): Promise<any> {
    try {
      const result = await this.connection.execute(
        `SELECT * FROM "empresas" WHERE cnpj = $1`,
        [cnpj]
      )
      return result
    } catch (error) {
      console.log(error)
      throw badImplementation('Erro ao buscar empresa por cnpj')
    }
  }

  async findByRazaoSocial(razaoSocial: string): Promise<any> {
    try {
      const result = await this.connection.execute(
        `SELECT * FROM "empresas" WHERE razao_social = $1`,
        [razaoSocial]
      )
      return result
    } catch (error) {
      console.log(error)
      throw badImplementation('Erro ao buscar empresa por razão social')
    }
  }
  async delete(id: string): Promise<any> {
    try {
      const result = await this.connection.execute(
        `DELETE FROM "empresas" WHERE id = $1`,
        [id]
      )
      return result
    } catch (error) {
      console.log(error)
      throw badImplementation('Erro ao excluir empresa')
    }
  }
}
