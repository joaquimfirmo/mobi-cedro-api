import { Inject, Service } from 'typedi'
import { Request, ResponseToolkit } from '@hapi/hapi'
import GetTransports from '../../application/usecases/transports/getTransports'
import GetTransportsByCity from '../../application/usecases/transports/getTransportsByCity'
import UpdateTransport from '../../application/usecases/transports/updateTransport'
import CreateTransport from '../../application/usecases/transports/createTransport'

@Service()
export default class TransportsController {
  constructor(
    @Inject('usecase.getTransports')
    readonly getTransports: GetTransports,
    @Inject('usecase.getTransportsByCity')
    readonly geTransportsByCity: GetTransportsByCity,
    @Inject('usecase.updateTransport')
    readonly updateTransport: UpdateTransport,
    @Inject('usecase.createTransport')
    readonly create: CreateTransport
  ) {}

  public async createTransport(
    request: Request,
    h: ResponseToolkit
  ): Promise<any> {
    const { message, status, data } = await this.create.execute(request.payload)
    return h
      .response({
        message,
        data,
      })
      .code(status)
  }

  public async getAllTransports(
    request: Request,
    h: ResponseToolkit
  ): Promise<any> {
    const transports = await this.getTransports.execute()
    return h.response(transports).code(200)
  }

  public async getTransportsByCity(
    request: Request,
    h: ResponseToolkit
  ): Promise<any> {
    const { transports, message, status } =
      await this.geTransportsByCity.execute(request.params.cityId)

    return h
      .response({
        transports,
        message,
      })
      .code(status)
  }

  public async updateTransportById(
    request: Request,
    h: ResponseToolkit
  ): Promise<any> {
    const { id } = request.params
    const { message, status, data } = await this.updateTransport.execute(
      id,
      request.payload
    )
    return h
      .response({
        message,
        data,
      })
      .code(status)
  }
}
