import Company from '../../domain/entities/company'

export default interface ICompanyRepository {
  create(company: Company): Promise<any>
  findAll(): Promise<any>
  findById(id: string): Promise<any>
  update(id: string, company: any): Promise<any>
  delete(id: string): Promise<any>
}
