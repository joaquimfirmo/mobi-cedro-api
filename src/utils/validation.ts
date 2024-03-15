import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { badRequest } from '@hapi/boom'

export const validationPipe = async (payload: any, classType: any) => {
  const instance = plainToInstance(classType, payload)
  const errors = await validate(instance, {
    validationError: { target: false },
  })
  if (errors.length > 0) {
    console.error(errors)
    const errs = errors.map((err) => {
      return {
        value: err.value,
        property: err.property,
        constraints: err.constraints,
      }
    })
    let validationErrorMessage = ''
    if (errors.length > 1) {
      validationErrorMessage =
        errs.map((err) => err.property).join(', ') + ' are invalid'
    } else {
      validationErrorMessage = `${errs[0].property} is invalid`
    }
    throw badRequest(`Invalid payload: ${validationErrorMessage}`)
  }
  return true
}
