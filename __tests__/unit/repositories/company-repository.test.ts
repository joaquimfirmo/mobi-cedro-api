import CompanyRepository from '../../../src/infrastructure/repositories/company-repository'

describe('Company Repository', () => {
  let companyRepository: CompanyRepository
  let connection: any

  beforeEach(() => {
    connection = {
      execute: jest.fn(),
    }
    companyRepository = new CompanyRepository(connection)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should return a company when the method create is called', async () => {
    const company = {
      id: '1',
      razaoSocial: 'razao social',
      nomeFantasia: 'nome fantasia',
      cnpj: '123456789',
    }

    const result = {
      rowCount: 1,
      rows: [
        {
          id: '1',
          nome_fantasia: 'nome fantasia',
        },
      ],
    }

    connection.execute.mockResolvedValueOnce({
      rowCount: result.rowCount,
      rows: result.rows,
    })

    const response = await companyRepository.create(company)
    expect(connection.execute).toHaveBeenCalledTimes(1)
    expect(connection.execute).toHaveBeenCalledWith(
      `INSERT INTO empresas (id, razao_social, nome_fantasia, cnpj)
         VALUES ($1, $2, $3, $4) RETURNING id, nome_fantasia`,
      [company.id, company.razaoSocial, company.nomeFantasia, company.cnpj]
    )

    expect(response).toEqual(result)
  })

  it('should return a list of companies when the method findAll is called', async () => {
    const limit = 2
    const offset = 0
    const companies = [
      {
        id: '1',
        razaoSocial: 'razao social 1',
        nomeFantasia: 'nome fantasia 1',
        cnpj: '123456781',
      },
      {
        id: '2',
        razaoSocial: 'razao social 2',
        nomeFantasia: 'nome fantasia 2',
        cnpj: '123456782',
      },
    ]

    const result = {
      rowCount: companies.length,
      rows: companies,
    }

    connection.execute.mockResolvedValueOnce({
      rowCount: result.rowCount,
      rows: result.rows,
    })

    const response = await companyRepository.findAll(limit, offset)
    expect(connection.execute).toHaveBeenCalledTimes(1)
    expect(connection.execute).toHaveBeenCalledWith(
      `SELECT * FROM "empresas" LIMIT $1 OFFSET $2`,
      [limit, offset]
    )
    expect(response).toEqual(result)
  })
})
