import DeleteCity from '../../../src/application/usecases/city/delete-city'

describe('DeleteCityUseCase', () => {
  let deleteCity: DeleteCity
  let cityRepository: any

  const id = Math.random().toString()

  beforeEach(() => {
    cityRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
    }
    deleteCity = new DeleteCity(cityRepository)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should return 404 if city does not exist', async () => {
    cityRepository.findById.mockResolvedValue({ rowCount: 0 })

    const response = await deleteCity.execute(id)

    expect(response).toEqual({
      message: 'Cidade para exclusão não encontrada',
      status: 404,
      data: [],
    })
  })

  it('should return 200 if city was deleted', async () => {
    cityRepository.findById.mockResolvedValue({ rowCount: 1 })
    cityRepository.delete.mockResolvedValue()

    const response = await deleteCity.execute(id)

    expect(response).toEqual({
      data: id,
      message: 'Cidade excluída com sucesso!',
      status: 200,
    })
  })
})
