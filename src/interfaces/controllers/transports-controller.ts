import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { Request, ResponseToolkit } from '@hapi/hapi'
import ListAllTransports from '../../application/usecases/transports/list-transports'
import FindTransportsByCity from '../../application/usecases/transports/find-transports'

@Service()
export default class TransportsController {
  @Inject('usecase.listAllTransports')
  private readonly listAlltransports?: ListAllTransports
  @Inject('usecase.findTransportsByCity')
  private readonly findTransportsByCity?: FindTransportsByCity

  constructor() {}

  public async getTransports(
    request: Request,
    h: ResponseToolkit
  ): Promise<any> {
    const transports = await this.listAlltransports?.execute()
    return h.response(transports).code(200)
  }

  public async findTrasportsByCity(
    request: Request,
    h: ResponseToolkit
  ): Promise<any> {
    const transportsByCity = await this.findTransportsByCity?.execute(
      request.params.city
    )

    return h.response(transportsByCity).code(200)
  }
}
