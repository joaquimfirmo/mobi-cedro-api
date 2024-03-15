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
  register: async function (server: any) {
    server.route([
      {
        method: 'GET',
        path: '/transportes',
        handler:
          transportsController.getAllTransports.bind(transportsController),
      },
      {
        method: 'GET',
        path: '/transportes/cidade/{cityId}',
        options: {
          validate: {
            params: async (value: any) => {
              await validationPipe(value, ParamDto)
            },
          },
        },
        handler:
          transportsController.getTransportsByCity.bind(transportsController),
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
        handler:
          transportsController.createTransport.bind(transportsController),
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
        handler:
          transportsController.updateTransportById.bind(transportsController),
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
        handler:
          transportsController.deleteTransportById.bind(transportsController),
      },
    ])
  },
}
