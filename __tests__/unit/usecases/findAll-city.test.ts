import FindAllCity from '../../../src/application/usecases/city/findAll-city'

describe('FindAllCityUseCase', () => {
  let findAllCity: FindAllCity
  let cityRepository: any

  const limit = Math.random()
  const offset = Math.random()

  beforeEach(() => {
    cityRepository = {
      findAll: jest.fn(),
    }
    findAllCity = new FindAllCity(cityRepository)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should return 200 if cities were found', async () => {
    cityRepository.findAll.mockResolvedValue([{ id: Math.random() }])

    const response = await findAllCity.execute(limit, offset)

    expect(response).toEqual({
      message: 'Cidades encontradas com sucesso',
      status: 200,
      data: [{ id: expect.any(Number) }],
    })
  })
})
