/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Container } from 'typedi'
import Connection from '../../database/connection'
import { cacheManager } from '../../cacheManager'

export function InjectRepository(className: any) {
  return function (object: any, propertyName?: string, index?: number) {
    const connection: Connection = Container.get(Connection)
    const repository = new className(connection, Container.get(cacheManager))
    Container.registerHandler({
      object,
      propertyName,
      index,
      value: (containerInstance) => repository,
    })
  }
}
