import { Server, Request, ResponseToolkit } from 'hapi'
import { Container } from 'typedi'
import CityController from '../controllers/city-controller'
import ParamDto from '../../application/dto/param-dto'
import CreateCityDto from '../../application/dto/create-city-dto'
import UpdateCityDto from '../../application/dto/update-city-dto'
import { validationPipe } from '../../utils/validation'
const cityController = Container.get(CityController)

module.exports = {
  name: 'city',
  version: '1.0.0',
  register: async function (server: Server) {
    server.route([
      {
        method: 'POST',
        path: '/cidade',
        options: {
          description: 'Cria uma cidade',
          validate: {
            payload: async (value: any) => {
              await validationPipe(value, CreateCityDto)
            },
          },
        },
        handler: (request: Request, h: ResponseToolkit) =>
          cityController.create(request, h),
      },
      {
        method: 'GET',
        path: '/cidades',
        options: {
          description: 'Lista todas as cidades',
        },
        handler: (request: Request, h: ResponseToolkit) =>
          cityController.findAll(request, h),
      },
      {
        method: 'PUT',
        path: '/cidade/{id}',
        options: {
          description: 'Atualiza uma cidade pelo id',
          validate: {
            params: async (value: any) => {
              await validationPipe(value, ParamDto)
            },
            payload: async (value: any) => {
              await validationPipe(value, UpdateCityDto)
            },
          },
        },
        handler: (request: Request, h: ResponseToolkit) =>
          cityController.update(request, h),
      },
      {
        method: 'DELETE',
        path: '/cidade/{id}',
        options: {
          description: 'Deleta uma cidade pelo id',
          validate: {
            params: async (value: any) => {
              await validationPipe(value, ParamDto)
            },
          },
        },
        handler: (request: Request, h: ResponseToolkit) =>
          cityController.delete(request, h),
      },
    ])
  },
}
