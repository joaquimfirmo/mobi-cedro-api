const ScheduleRepository = require('./schedule-repository')

describe('testes schedule repository', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const connection = {
    connect: jest.fn(),
    query: jest.fn().mockReturnValue({
      rows: [
        {
          dia_semana: 'Segunda',
          cidade_origem: 'São Paulo',
          cidade_destino: 'Campinas',
          tipo_veiculo: 'Onibus',
          hora_saida: '08:00',
          hora_chegada: '09:00',
          valor: 10.0,
        },
        {
          dia_semana: 'Terça',
          cidade_origem: 'São Paulo',
          cidade_destino: 'Osasco',
          tipo_veiculo: 'Onibus',
          hora_saida: '10:00',
          hora_chegada: '11:00',
          valor: 10.0,
        },
      ],
    }),
    close: jest.fn(),
  }

  const schedulesRepository = new ScheduleRepository(connection)

  test('Deve listar todos os horarios', async () => {
    const repositoryAllMethod = jest.spyOn(schedulesRepository, 'all')
    const connectionQueryMethod = jest.spyOn(connection, 'query')
    const connectionCloseMethod = jest.spyOn(connection, 'close')

    const schedules = await schedulesRepository.all()

    expect(repositoryAllMethod).toHaveBeenCalledTimes(1)
    expect(connectionQueryMethod).toHaveBeenCalledTimes(1)
    expect(connectionCloseMethod).toHaveBeenCalledTimes(1)
    expect(schedules).toHaveLength(2)
    expect(schedules[0].dia_semana).toBe('Segunda')
    expect(schedules[0].cidade_destino).toBe('Campinas')
    expect(schedules[0].tipo_veiculo).toBe('Onibus')
    expect(schedules[1].dia_semana).toBe('Terça')
    expect(schedules[1].cidade_destino).toBe('Osasco')
    expect(schedules[1].tipo_veiculo).toBe('Onibus')
  })

  test('Deve executar o metodo findByCity com o paramentro passsado', async () => {
    const city = 'São Paulo'

    const repositoryFindByCityMethod = jest.spyOn(
      schedulesRepository,
      'findByCity'
    )
    const connectionQueryMethod = jest.spyOn(connection, 'query')
    const connectionCloseMethod = jest.spyOn(connection, 'close')

    await schedulesRepository.findByCity(city)

    expect(repositoryFindByCityMethod).toHaveBeenCalledWith(city)
    expect(connectionQueryMethod).toHaveBeenCalledTimes(1)
    expect(connectionCloseMethod).toHaveBeenCalledTimes(1)
  })
})
