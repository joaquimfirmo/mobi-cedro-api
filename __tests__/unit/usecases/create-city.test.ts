import 'reflect-metadata'
import { Container } from 'typedi'
import CreateCity from '../../../src/application/usecases/city/create-city'
import Connection from '../../../src/infrastructure/database/connection'
import City from '../../../src/domain/entities/city'
import { badRequest } from 'boom'

jest.mock('../../../src/infrastructure/database/pool', () => ({
  getInstance: jest.fn().mockReturnValue({
    connect: jest.fn().mockResolvedValue({
      query: jest.fn(),
      end: jest.fn(),
    }),
  }),
}))
describe('CreateCityUseCase', () => {
  let createCity: CreateCity
  let cityRepository: any

  beforeEach(() => {
    Container.set(Connection, new Connection())

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

    const city: City = City.create('São Paulo', 'SP')
    cityRepository.findByNameAndUf.mockResolvedValueOnce(cityExists)
    cityRepository.create.mockResolvedValueOnce({})

    const response = await createCity.execute(city)

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

  it('should return a error of badRequest if city alexist', async () => {
    const city: City = City.create('São Paulo', 'SP')

    const cityExists = {
      rows: [
        {
          nome: 'São Paulo',
          uf: 'SP',
        },
      ],
    }

    cityRepository.findByNameAndUf.mockResolvedValueOnce(cityExists)

    expect(async () => {
      await createCity.execute(city)
    }).rejects.toThrow(badRequest(`Cidade ${city.nome}-${city.uf} já existe`))

    // try {
    //   await createCity.execute(city)
    // } catch (error: any) {
    //   expect(cityRepository.findByNameAndUf).toHaveBeenCalledTimes(1)
    //   expect(cityRepository.findByNameAndUf).toHaveBeenCalledWith(city)

    //   expect(cityRepository.create).toHaveBeenCalledTimes(0)
    //   expect(error.message).toBe('Cidade São Paulo-SP já existe')
    //   expect(error.output.statusCode).toBe(400)
    // }

    //criar um teste para verificar se a mensagem de erro é a esperada
  })
})
