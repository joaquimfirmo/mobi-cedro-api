import { Inject, Service } from 'typedi'
import { Request, ResponseToolkit } from '@hapi/hapi'
import CreateCity from '../../application/usecases/city/create-city'
import FindAllCity from '../../application/usecases/city/findAll-city'
import UpdateCity from '../../application/usecases/city/update-city'
import DeleteCity from '../../application/usecases/city/delete-city'

@Service()
export default class CityController {
  constructor(
    @Inject('usecase.createCity')
    private readonly createCity: CreateCity,
    @Inject('usecase.findAllCity')
    private readonly findAllCity: FindAllCity,
    @Inject('usecase.updateCity')
    private readonly updateCity: UpdateCity,
    @Inject('usecase.deleteCity')
    private readonly deleteCity: DeleteCity
  ) {}

  async create(request: Request, h: ResponseToolkit): Promise<any> {
    const { name, uf } = request.payload as any
    const { cityCreated, message, status } = await this.createCity.execute(
      name,
      uf
    )
    return h
      .response({
        cityCreated,
        message,
      })
      .code(status)
  }

  async findAll(request: Request, h: ResponseToolkit): Promise<any> {
    const { limit, offset } = request.query as any
    const { cities, message, status } = await this.findAllCity.execute(
      limit,
      offset
    )
    return h
      .response({
        cities,
        message,
      })
      .code(status)
  }

  async update(request: Request, h: ResponseToolkit): Promise<any> {
    const id = request.params.id
    const { cityUpdated, message, status } = await this.updateCity.execute(
      id,
      request.payload
    )
    return h
      .response({
        cityUpdated,
        message,
      })
      .code(status)
  }

  async delete(request: Request, h: ResponseToolkit): Promise<any> {
    const id = request.params.id
    const { message, status, data } = await this.deleteCity.execute(id)
    return h
      .response({
        message,
        data,
      })
      .code(status)
  }
}
