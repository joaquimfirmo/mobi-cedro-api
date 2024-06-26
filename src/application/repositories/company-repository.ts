import Company from '../../domain/entities/company'

export default interface ICompanyRepository {
  create(company: Company): Promise<any>
  findAll(imit: number, offset: number): Promise<any>
  findById(id: string): Promise<any>
  findByCnpj(cnpj: string): Promise<any>
  findByRazaoSocial(razao_social: string): Promise<any>
  update(id: string, company: any): Promise<any>
  delete(id: string): Promise<any>
}
