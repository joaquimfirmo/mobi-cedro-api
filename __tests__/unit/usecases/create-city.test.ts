import CreateCity from '../../../src/application/usecases/city/create-city'
describe('CreateCityUseCase', () => {
  let createCity: CreateCity
  let cityRepository: any

  beforeEach(() => {
    cityRepository = {
      create: jest.fn(),
      findByNameAndUf: jest.fn(),
    }
    createCity = new CreateCity(cityRepository)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should return a city when the method execute is called', async () => {
    const cityExists = {
      rows: [],
    }

    const city = {
      nome: 'São Paulo',
      uf: 'SP',
    }
    cityRepository.findByNameAndUf.mockResolvedValueOnce(cityExists)
    cityRepository.create.mockResolvedValueOnce({})

    const response = await createCity.execute(city.nome, city.uf)

    expect(cityRepository.findByNameAndUf).toHaveBeenCalledTimes(1)

    expect(cityRepository.create).toHaveBeenCalledTimes(1)
    expect(cityRepository.create).toHaveBeenCalledWith(
      expect.objectContaining(city)
    )
    expect(response).toEqual({
      data: response.data,
      message: 'Cidade criada com sucesso',
      status: 201,
    })
  })

  it('should return a message when the city already exists', async () => {
    const city = {
      nome: 'São Paulo',
      uf: 'SP',
    }

    const cityExists = {
      rows: [
        {
          nome: 'São Paulo',
          uf: 'SP',
        },
      ],
    }

    cityRepository.findByNameAndUf.mockResolvedValueOnce(cityExists)

    const response = await createCity.execute(city.nome, city.uf)

    expect(cityRepository.findByNameAndUf).toHaveBeenCalledTimes(1)
    expect(cityRepository.findByNameAndUf).toHaveBeenCalledWith(
      city.nome,
      city.uf
    )

    expect(cityRepository.create).toHaveBeenCalledTimes(0)

    expect(response).toEqual({
      data: [],
      message: 'Cidade já existe',
      status: 400,
    })
  })
})
