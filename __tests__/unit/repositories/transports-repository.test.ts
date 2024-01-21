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
        dia_semana: 'segunda-feira',
        cidade_origem: 'Cedro-CE',
        cidade_destino: 'Iguatu-CE',
        nome: 'Transporte 1',
        veiculo: 'Carro',
        hora_saida: '08:00',
        hora_chegada: '09:00',
      },
      {
        dia_semana: 'terça-feira',
        cidade_origem: 'Cedro-CE',
        cidade_destino: 'Juazeiro do Norte-CE',
        nome: 'Transporte 2',
        veiculo: 'ônibus',
        hora_saida: '08:00',
        hora_chegada: '12:00',
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
      `SELECT horarios.dia_semana,
                rotas.cidade_origem,
                rotas.cidade_destino,
                transportes.nome,
                tipos_transportes.veiculo,
                horarios.hora_saida,
                horarios.hora_chegada
        FROM horarios
            INNER JOIN rotas ON rotas.id = horarios.id_rota
            INNER JOIN transportes ON transportes.id = horarios.id_transporte
            INNER JOIN tipos_transportes ON tipos_transportes.id = transportes.id_tipo_transporte`,
      []
    )

    expect(response).toEqual(result)
  })

  it('should return a list of transports when the method findByCity is called', async () => {
    const city = 'Cedro-CE'
    const mockTransportsByCity = [
      {
        dia_semana: 'segunda-feira',
        cidade_origem: 'Cedro-CE',
        cidade_destino: 'Iguatu-CE',
        nome: 'Transporte 1',
        veiculo: 'Carro',
        hora_saida: '08:00',
        hora_chegada: '09:00',
      },
      {
        dia_semana: 'terça-feira',
        cidade_origem: 'Cedro-CE',
        cidade_destino: 'Juazeiro do Norte-CE',
        nome: 'Transporte 2',
        veiculo: 'ônibus',
        hora_saida: '08:00',
        hora_chegada: '12:00',
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
      `SELECT horarios.dia_semana,
                rotas.cidade_origem,
                rotas.cidade_destino,
                transportes.nome,
                tipos_transportes.veiculo,
                horarios.hora_saida,
                horarios.hora_chegada
        FROM horarios
            INNER JOIN rotas ON rotas.id = horarios.id_rota
            INNER JOIN transportes ON transportes.id = horarios.id_transporte
            INNER JOIN tipos_transportes ON tipos_transportes.id = transportes.id_tipo_transporte
        WHERE rotas.cidade_origem = $1
        ORDER BY horarios.hora_saida ASC;`,
      [city]
    )

    expect(response).toEqual(result)
  })
})
