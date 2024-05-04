import 'reflect-metadata'
import { Container } from 'typedi'
import UpdateCity from '../../../src/application/usecases/city/update-city'
import Connection from '../../../src/infrastructure/database/connection'

jest.mock('../../../src/infrastructure/database/pool', () => ({
  getInstance: jest.fn().mockReturnValue({
    connect: jest.fn().mockResolvedValue({
      query: jest.fn(),
      end: jest.fn(),
    }),
  }),
}))

describe('UpdateCityUseCase', () => {
  let updateCity: UpdateCity
  let cityRepository: any

  const id = Math.random().toString()
  const city = {
    nome: 'any_nome',
    uf: 'any_uf',
  }

  beforeEach(() => {
    Container.set(Connection, new Connection())

    cityRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    }
    updateCity = new UpdateCity(cityRepository)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should return 404 if city does not exist', async () => {
    cityRepository.findById.mockResolvedValue({ rowCount: 0 })

    const response = await updateCity.execute(id, city)

    expect(response).toEqual({
      message: 'Cidade não encontrada',
      status: 404,
      data: [],
    })
  })

  it('should return 200 if city was updated', async () => {
    cityRepository.findById.mockResolvedValue({ rowCount: 1 })
    cityRepository.update.mockResolvedValue({ rows: [city] })

    const response = await updateCity.execute(id, city)

    expect(response).toEqual({
      data: city,
      message: 'Cidade atualizada com sucesso',
      status: 200,
    })
  })
})
