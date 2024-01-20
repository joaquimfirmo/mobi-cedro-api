import { Inject, Service } from 'typedi'
import { Request, ResponseToolkit } from '@hapi/hapi'
import ListAllTransports from '../../application/usecases/transports/list-transports'
import FindTransportsByCity from '../../application/usecases/transports/find-transports'

@Service()
export default class TransportsController {
  constructor(
    @Inject('usecase.listAllTransports')
    readonly listAlltransports?: ListAllTransports,
    @Inject('usecase.findTransportsByCity')
    readonly findTransportsByCity?: FindTransportsByCity
  ) {}

  public async getAllTransports(
    request: Request,
    h: ResponseToolkit
  ): Promise<any> {
    const transports = await this.listAlltransports?.execute()
    return h.response(transports).code(200)
  }

  public async getTransportsByCity(
    request: Request,
    h: ResponseToolkit
  ): Promise<any> {
    const transportsByCity = await this.findTransportsByCity?.execute(
      request.params.city
    )

    return h.response(transportsByCity).code(200)
  }
}
