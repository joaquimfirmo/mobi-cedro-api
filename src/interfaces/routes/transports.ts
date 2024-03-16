import { Server, Request, ResponseToolkit } from 'hapi'
import { Container } from 'typedi'
import TransportsController from '../controllers/transports-controller'
import { validationPipe } from '../../utils/validation'
import ParamDto from '../../application/dto/param-dto'
import UpdateTransports from '../../application/dto/update-transports-dto'
import CreateTransportDto from '../../application/dto/create-transports-dto'
const transportsController = Container.get(TransportsController)

module.exports = {
  name: 'transports',
  version: '1.0.0',
  register: async function (server: Server) {
    server.route([
      {
        method: 'GET',
        path: '/transportes',
        handler: (request: Request, h: ResponseToolkit) =>
          transportsController.getAllTransports(request, h),
      },
      {
        method: 'GET',
        path: '/transportes/cidade/{id}',
        options: {
          validate: {
            params: async (value: any) => {
              await validationPipe(value, ParamDto)
            },
          },
        },
        handler: (request: Request, h: ResponseToolkit) =>
          transportsController.getTransportsByCity(request, h),
      },

      {
        method: 'POST',
        path: '/transporte',
        options: {
          validate: {
            payload: async (value: any) => {
              await validationPipe(value, CreateTransportDto)
            },
          },
        },
        handler: (request: Request, h: ResponseToolkit) =>
          transportsController.createTransport(request, h),
      },
      {
        method: 'PUT',
        path: '/transportes/{id}',
        options: {
          validate: {
            params: async (value: any) => {
              await validationPipe(value, ParamDto)
            },
            payload: async (value: any) => {
              await validationPipe(value, UpdateTransports)
            },
          },
        },
        handler: (request: Request, h: ResponseToolkit) =>
          transportsController.updateTransportById(request, h),
      },
      {
        method: 'DELETE',
        path: '/transportes/{id}',
        options: {
          validate: {
            params: async (value: any) => {
              await validationPipe(value, ParamDto)
            },
          },
        },
        handler: (request: Request, h: ResponseToolkit) =>
          transportsController.deleteTransportById(request, h),
      },
    ])
  },
}
