import TransportsRepository from '../../../src/infrastructure/repositories/transports-repository'

describe('Transports Repository', () => {
  let transportsRepository: TransportsRepository
  let connection: any

  beforeEach(() => {
    connection = {
      execute: jest.fn(),
    }
    transportsRepository = new TransportsRepository(connection)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should return a list of transports when the method findAll is called', async () => {
    const mockTransports = [
      {
        cidade_origem: 'Cedro-CE',
        cidade_destino: 'Iguatu-CE',
        dia_semana: 'Segunda-feira',
        localizacao: 'Terminal Rodoviário Cedro-Ce',
        hora_saida: '08:00',
        hora_chegada: '09:00',
        preco: '$10.0',
        nome: 'Van',
        empresa: 'Empresa 1',
      },
      {
        cidade_origem: 'Iguatu-CE',
        cidade_destino: 'Cedro-CE',
        dia_semana: 'Segunda-feira',
        localizacao: 'Terminal Rodoviário Iguatu-Ce',
        hora_saida: '10:00',
        hora_chegada: '11:00',
        preco: '$10.0',
        nome: 'Van',
        empresa: 'Empresa 2',
      },
    ]

    const result = {
      rowCount: mockTransports.length,
      rows: mockTransports,
    }

    connection.execute.mockResolvedValueOnce({
      rowCount: result.rowCount,
      rows: result.rows,
    })

    const response = await transportsRepository.findAll()
    expect(connection.execute).toHaveBeenCalledTimes(1)
    expect(connection.execute).toHaveBeenCalledWith(
      `SELECT rotas.cidade_origem,
              rotas.cidade_destino,
              rotas.dia_semana,
              rotas.localizacao,
              rotas.hora_saida,
              rotas.hora_chegada,
              rotas.preco,
              veiculos.nome,
              empresas.nome_fantasia as empresa
          FROM rotas
              INNER JOIN veiculos ON veiculos.id = rotas.id_veiculo
              INNER JOIN empresas ON empresas.id = rotas.id_empresa`
    )

    expect(response).toEqual(result)
  })

  it('should return a list of transports when the method findByCity is called', async () => {
    const city = 'Cedro-CE'
    const mockTransportsByCity = [
      {
        cidade_origem: 'Iguatu-CE',
        cidade_destino: 'Cedro-CE',
        dia_semana: 'Segunda-feira',
        localizacao: 'Terminal Rodoviário Iguatu-Ce',
        hora_saida: '10:00',
        hora_chegada: '11:00',
        preco: '$10.0',
        nome: 'Van',
        empresa: 'Empresa 2',
        id_cidade: '2',
      },
      {
        cidade_origem: 'Iguatu-CE',
        cidade_destino: 'Juazeiro do Norte-CE',
        dia_semana: 'Segunda-feira',
        localizacao: 'Terminal Rodoviário Iguatu-Ce',
        hora_saida: '10:00',
        hora_chegada: '13:00',
        preco: '$10.0',
        nome: 'ônibus',
        empresa: 'Empresa 2',
        id_cidade: '2',
      },
    ]

    const result = {
      rowCount: mockTransportsByCity.length,
      rows: mockTransportsByCity,
    }

    connection.execute.mockResolvedValueOnce({
      rowCount: result.rowCount,
      rows: result.rows,
    })

    const response = await transportsRepository.findByCity(city)
    expect(connection.execute).toHaveBeenCalledTimes(1)
    expect(connection.execute).toHaveBeenCalledWith(
      `SELECT rotas.cidade_origem,
              rotas.cidade_destino, 
              rotas.dia_semana,
              rotas.localizacao,
              rotas.hora_saida,
              rotas.hora_chegada,
              rotas.preco,
              veiculos.nome,
              empresas.nome_fantasia as empresa,
              rotas.id_cidade
        FROM rotas
            INNER JOIN veiculos ON veiculos.id = rotas.id_veiculo
            INNER JOIN empresas ON empresas.id = rotas.id_empresa
            WHERE rotas.id_cidade = $1
            ORDER BY rotas.dia_semana ASC, rotas.hora_saida ASC`,
      [city]
    )

    expect(response).toEqual(result)
  })
})
