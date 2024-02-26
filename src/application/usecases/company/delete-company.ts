import { Inject, Service } from 'typedi'
import CompanyRepository from '../../repositories/company-repository'

@Service('usecase.deleteCompany')
export default class DeleteCompany {
  constructor(
    @Inject('repository.company')
    readonly companyRepository: CompanyRepository
  ) {}

  async execute(id: string): Promise<any> {
    try {
      const companyExists = await this.companyRepository.findById(id)
      if (companyExists.rowCount === 0) {
        return {
          message: 'Empresa para exclusão não encontrada',
          status: 404,
          data: [],
        }
      }

      await this.companyRepository.delete(id)

      return {
        message: 'Empresa excluída com sucesso!',
        status: 200,
        data: id,
      }
    } catch (error) {
      console.log(error)
      return {
        message: 'Erro ao excluir empresa',
        status: 500,
        data: [],
      }
    }
  }
}
