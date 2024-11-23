/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Container } from 'typedi'
import Connection from '../../database/connection'
import { cacheManager } from '../../cacheManager'
import { BaseRepository } from '../../repositories/base-repository'

export function InjectRepository(className: any) {
  if (
    className === undefined ||
    className === null ||
    !(className.prototype instanceof BaseRepository)
  ) {
    throw new Error(
      'Invalid Repository class. Repository class must extend BaseRepository'
    )
  }
  return function (object: any, propertyName?: string, index?: number) {
    const repository = new className(
      Container.get(Connection),
      Container.get(cacheManager)
    )
    Container.registerHandler({
      object,
      propertyName,
      index,
      value: (containerInstance) => repository,
    })
  }
}
