import Company from '../../domain/entities/company'

export default interface ICompanyRepository {
  create(company: Company): Promise<any>
  findAll(): Promise<any>
}
