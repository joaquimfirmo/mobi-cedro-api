/* eslint-disable @typescript-eslint/ban-types */
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator'
import { Container } from 'typedi'
import Connection from '../../../infrastructure/database/connection'

type table = {
  tableName: string
}

export function IsValidKey(
  tableName: table,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [tableName],
      validator: IsValidKeyConstraint,
    })
  }
}

@ValidatorConstraint({ async: true })
class IsValidKeyConstraint implements ValidatorConstraintInterface {
  async validate(id: string, args: ValidationArguments) {
    const tableName = args.constraints[0].tableName
    const connection = Container.get(Connection)
    const query = `SELECT id FROM ${tableName} WHERE id = $1`
    const result = await connection.execute(query, [id])
    return result.rowCount > 0
  }
}
