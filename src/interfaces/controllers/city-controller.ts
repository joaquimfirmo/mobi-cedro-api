import { Inject, Service } from 'typedi'
import { Request, ResponseToolkit } from '@hapi/hapi'
import CreateCity from '../../application/usecases/city/create-city'
import FindAllCity from '../../application/usecases/city/findAll-city'

@Service()
export default class CityController {
  constructor(
    @Inject('usecase.createCity')
    private readonly createCity: CreateCity,
    @Inject('usecase.findAllCity')
    private readonly findAllCity: FindAllCity
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
}
