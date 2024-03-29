import { Inject, Service } from 'typedi'
import { Request, ResponseToolkit } from 'hapi'
import GetTransports from '../../application/usecases/transports/getTransports'
import GetTransportsByCity from '../../application/usecases/transports/getTransportsByCity'
import UpdateTransport from '../../application/usecases/transports/updateTransport'
import CreateTransport from '../../application/usecases/transports/createTransport'
import DeleteTransport from '../../application/usecases/transports/deleteTransport'

@Service()
export default class TransportsController {
  constructor(
    @Inject('usecase.deleteTransport')
    readonly deleteTransport: DeleteTransport,
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
    const { data, message, status } = await this.create.execute(request.payload)
    return h
      .response({
        data,
        message,
      })
      .code(status)
  }

  public async getAllTransports(
    request: Request,
    h: ResponseToolkit
  ): Promise<any> {
    const { data, message, status } = await this.getTransports.execute()
    return h
      .response({
        data,
        message,
      })
      .code(status)
  }

  public async getTransportsByCity(
    request: Request,
    h: ResponseToolkit
  ): Promise<any> {
    const { data, message, status } = await this.geTransportsByCity.execute(
      request.params.id
    )

    return h
      .response({
        data,
        message,
      })
      .code(status)
  }

  public async updateTransportById(
    request: Request,
    h: ResponseToolkit
  ): Promise<any> {
    const { id } = request.params
    const { data, message, status } = await this.updateTransport.execute(
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

  public async deleteTransportById(
    request: Request,
    h: ResponseToolkit
  ): Promise<any> {
    const { data, message, status } = await this.deleteTransport.execute(
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
