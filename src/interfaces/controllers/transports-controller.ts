import { Request, ResponseToolkit } from '@hapi/hapi'
import ListAllTransports from '../../application/usecases/transports/list-transports'
import findTransportsByCity from '../../application/usecases/transports/find-transports'
import DatabaseRepositoryFactory from '../../infrastructure/factories/database-repository-factory'
import Connection from '../../infrastructure/database/connection'

class TransportsController {
  connection: Connection

  constructor() {
    this.connection = new Connection()
  }

  public async getTransports(
    request: Request,
    h: ResponseToolkit
  ): Promise<any> {
    await this.connection.connect()
    const transportsRepository = new DatabaseRepositoryFactory(this.connection)
    const listAllTransports = new ListAllTransports(transportsRepository)
    const transports = await listAllTransports.execute()
    return h.response(transports).code(200)
  }

  public async findSchedulesByCity(
    request: Request,
    h: ResponseToolkit
  ): Promise<any> {
    await this.connection.connect()
    const transportsRepository = new DatabaseRepositoryFactory(this.connection)
    const transportsByCity = new findTransportsByCity(transportsRepository)
    const transports = await transportsByCity.execute(request.params.city)
    return h.response(transports).code(200)
  }
}

export default new TransportsController()