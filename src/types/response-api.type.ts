import CityDto from '../application/dto/city-dto'

export enum StatusCodes {
  success = 200,
  created = 201,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  internalServerError = 500,
}

export type ResponseApi = {
  message: string
  rows?: number
  page?: number
  data: CityDto[]
}
