import 'reflect-metadata'
import { badImplementation } from '@hapi/boom'
import FindAllCity from '../../../src/application/usecases/city/findAll-city'
import { Container } from 'typedi'
import Connection from '../../../src/infrastructure/database/connection'

jest.mock('../../../src/infrastructure/database/pool', () => ({
  getInstance: jest.fn().mockReturnValue({
    connect: jest.fn().mockResolvedValue({
      query: jest.fn(),
      end: jest.fn(),
    }),
  }),
}))

describe('FindAllCityUseCase', () => {
  let findAllCity: FindAllCity
  let cityRepository: any
  const limit = Math.random()
  const offset = Math.random()

  beforeAll(async () => {
    Container.set(Connection, new Connection())

    cityRepository = {
      findAll: jest.fn(),
    }

    findAllCity = new FindAllCity(cityRepository)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should return 200 if cities were found', async () => {
    cityRepository.findAll.mockResolvedValue({
      rows: 1,
      cities: [{ id: Math.random(), nome: 'Cedro', uf: 'CE' }],
    })

    const response = await findAllCity.execute(limit, offset)

    expect(response).toEqual({
      data: [{ id: expect.any(Number), nome: 'Cedro', uf: 'CE' }],
      rows: 1,
    })
  })

  it('should return 500 if an error occurs', async () => {
    cityRepository.findAll.mockRejectedValueOnce(
      badImplementation('Erro ao buscar cidades')
    )

    try {
      await findAllCity.execute(limit, offset)
    } catch (error: any) {
      expect(error).toEqual(Error('Erro ao buscar cidades'))
      expect(error.output.statusCode).toBe(500)
    }
  })
})
