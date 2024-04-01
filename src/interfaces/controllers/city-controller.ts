import { Service } from 'typedi'
import { Request, ResponseToolkit } from 'hapi'
import CreateCity from '../../application/usecases/city/create-city'
import FindAllCity from '../../application/usecases/city/findAll-city'
import UpdateCity from '../../application/usecases/city/update-city'
import DeleteCity from '../../application/usecases/city/delete-city'

@Service()
export default class CityController {
  constructor(
    private readonly createCity: CreateCity,
    private readonly findAllCity: FindAllCity,
    private readonly updateCity: UpdateCity,
    private readonly deleteCity: DeleteCity
  ) {}

  async create(request: Request, h: ResponseToolkit): Promise<any> {
    const { nome, uf } = request.payload as any
    const { data, message, status } = await this.createCity.execute(nome, uf)
    return h
      .response({
        data,
        message,
      })
      .code(status)
  }

  async findAll(request: Request, h: ResponseToolkit): Promise<any> {
    const { limit, offset } = request.query as any
    const { data, message, status } = await this.findAllCity.execute(
      limit,
      offset
    )
    return h
      .response({
        data,
        message,
      })
      .code(status)
  }

  async update(request: Request, h: ResponseToolkit): Promise<any> {
    const id = request.params.id
    const { data, message, status } = await this.updateCity.execute(
      id,
      request.payload
    )
    return h
      .response({
        data,
        message,
      })
      .code(status)
  }

  async delete(request: Request, h: ResponseToolkit): Promise<any> {
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
