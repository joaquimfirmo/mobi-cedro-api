import { Service } from 'typedi'
import { Request, ResponseToolkit, ResponseObject } from 'hapi'
import City from '../../domain/entities/city'
import CreateCity from '../../application/usecases/city/create-city'
import FindAllCity from '../../application/usecases/city/findAll-city'
import UpdateCity from '../../application/usecases/city/update-city'
import DeleteCity from '../../application/usecases/city/delete-city'
import { ResponseApi, StatusCodes } from '../../types/response-api.type'
@Service()
export default class CityController {
  constructor(
    private readonly createCity: CreateCity,
    private readonly findAllCity: FindAllCity,
    private readonly updateCity: UpdateCity,
    private readonly deleteCity: DeleteCity
  ) {}

  async create(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    const { nome, uf } = request.payload as any

    const newCity: City = City.create(nome, uf)

    const { data, message } = await this.createCity.execute(newCity)

    const response: ResponseApi = {
      data,
      message,
    }
    return h.response(response).code(StatusCodes.success)
  }

  async findAll(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    const { limit, offset } = request.query as any

    const { data, rows } = await this.findAllCity.execute(limit, offset)

    let response: ResponseApi

    if (data.length === 0) {
      response = {
        message: 'Nenhuma cidade encontrada',
        page: 0,
        data: [],
      }
    } else {
      response = {
        message: 'Cidades encontradas',
        rows,
        page: 1,
        data,
      }
    }

    return h.response(response).code(StatusCodes.success)
  }

  async update(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    const id = request.params.id

    const { nome, uf } = request.payload as any

    const city: City = new City(id, nome, uf)

    const { data, message, status } = await this.updateCity.execute(id, city)
    return h
      .response({
        data,
        message,
      })
      .code(status)
  }

  async delete(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    const { message, status, data } = await this.deleteCity.execute(
      request.params.id
    )
    return h
      .response({
        data,
        message,
      })
      .code(status)
  }
}
