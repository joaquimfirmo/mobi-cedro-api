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
      `SELECT transportes.cidade_origem,
              transportes.cidade_destino,
              transportes.dia_semana,
              transportes.localizacao,
              transportes.hora_saida,
              transportes.hora_chegada,
              transportes.preco,
              veiculos.nome,
              empresas.nome_fantasia as empresa
          FROM transportes
              INNER JOIN veiculos ON veiculos.id = transportes.id_veiculo
              INNER JOIN empresas ON empresas.id = transportes.id_empresa
              LIMIT $1 OFFSET $2`,
      [20, 0]
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
      `SELECT transportes.id,
              transportes.cidade_origem,
              transportes.cidade_destino, 
              transportes.dia_semana,
              transportes.localizacao,
              transportes.hora_saida,
              transportes.hora_chegada,
              transportes.preco,
              veiculos.nome,
              empresas.nome_fantasia as empresa,
              transportes.id_cidade
        FROM transportes
            INNER JOIN veiculos ON veiculos.id = transportes.id_veiculo
            INNER JOIN empresas ON empresas.id = transportes.id_empresa
            WHERE transportes.id_cidade = $1
            ORDER BY transportes.dia_semana ASC, transportes.hora_saida ASC`,
      [city]
    )

    expect(response).toEqual(result)
  })

  it('should return a transport when the method findByHash is called', async () => {
    const hash = '1234567890'
    const mockTransport = {
      id: '1234567890',
      cidade_origem: 'Cedro-CE',
      cidade_destino: 'Iguatu-CE',
      dia_semana: 'Segunda-feira',
      localizacao: 'Terminal Rodoviário Cedro-Ce',
      hora_saida: '08:00',
      hora_chegada: '09:00',
      preco: '$10.0',
      nome: 'Van',
      empresa: 'Empresa 1',
      hash,
    }

    const result = {
      rowCount: 1,
      rows: [mockTransport],
    }

    connection.execute.mockResolvedValueOnce({
      rowCount: result.rowCount,
      rows: result.rows,
    })

    const response = await transportsRepository.findByHash(hash)
    expect(connection.execute).toHaveBeenCalledTimes(1)
    expect(connection.execute).toHaveBeenCalledWith(
      `SELECT * FROM transportes WHERE md5_hash = $1`,
      [hash]
    )

    expect(response).toEqual(result)
  })

  it('should return a id transport when the method findById is called', async () => {
    const id = '1234567890'
    const mockTransport = {
      id: '1234567890',
      cidade_origem: 'Cedro-CE',
      cidade_destino: 'Iguatu-CE',
      dia_semana: 'Segunda-feira',
      localizacao: 'Terminal Rodoviário Cedro-Ce',
      hora_saida: '08:00',
      hora_chegada: '09:00',
      preco: '$10.0',
      nome: 'Van',
      empresa: 'Empresa 1',
    }

    const result = {
      rowCount: 1,
      rows: [mockTransport],
    }

    connection.execute.mockResolvedValueOnce({
      rowCount: result.rowCount,
      rows: result.rows,
    })

    const response = await transportsRepository.findById(id)
    expect(connection.execute).toHaveBeenCalledTimes(1)
    expect(connection.execute).toHaveBeenCalledWith(
      `SELECT id FROM transportes WHERE id = $1`,
      [id]
    )

    expect(response).toEqual(result)
  })

  it('should delete a transport when the method delete is called', async () => {
    const id = '1234567890'
    const result = {
      rowCount: 1,
    }

    connection.execute.mockResolvedValueOnce({
      rowCount: result.rowCount,
    })

    const response = await transportsRepository.delete(id)
    expect(connection.execute).toHaveBeenCalledTimes(1)
    expect(connection.execute).toHaveBeenCalledWith(
      `DELETE FROM transportes WHERE id = $1`,
      [id]
    )

    expect(response).toEqual(result)
  })
})
