import { Server } from 'hapi'
import { validationPipe } from '../../utils/validation'
import ParamDto from '../../application/dto/param-dto'
import UpdateTransports from '../../application/dto/update-transports-dto'
import CreateTransportDto from '../../application/dto/create-transports-dto'
import {
  findAllTransports,
  findAllTransportsByCity,
  findAllCitiesWithTransports,
  createTransport,
  updateTransport,
  deleteTransport,
} from '../handlers/transports'

// RBAC plugin for authorization control

module.exports = {
  name: 'transports',
  version: '1.0.0',
  register: async function (server: Server) {
    server.route([
      {
        method: 'GET',
        path: '/transportes',
        options: {
          description: 'Lista todos os transportes',
          auth: false,
          plugins: {
            rbac: 'none',
          },
        },
        handler: findAllTransports,
      },
      {
        method: 'GET',
        path: '/transportes/cidade/{id}',
        options: {
          description: 'Lista todos os transportes por cidade',
          auth: false,
          plugins: {
            rbac: 'none',
          },
          validate: {
            params: async (value: any) => {
              await validationPipe(value, ParamDto)
            },
          },
        },
        handler: findAllTransportsByCity,
      },

      {
        method: 'GET',
        path: '/transportes/cidades',
        options: {
          description: 'Lista todas as cidades com transportes cadastrados',
          auth: false,
          plugins: {
            rbac: 'none',
          },
        },
        handler: findAllCitiesWithTransports,
      },

      {
        method: 'POST',
        path: '/transporte',
        options: {
          description: 'Cria um transporte',
          validate: {
            payload: async (value: any) => {
              await validationPipe(value, CreateTransportDto)
            },
          },
        },
        handler: createTransport,
      },
      {
        method: 'PUT',
        path: '/transportes/{id}',
        options: {
          description: 'Atualiza um transporte pelo id',
          validate: {
            params: async (value: any) => {
              await validationPipe(value, ParamDto)
            },
            payload: async (value: any) => {
              await validationPipe(value, UpdateTransports)
            },
          },
        },
        handler: updateTransport,
      },
      {
        method: 'DELETE',
        path: '/transportes/{id}',
        options: {
          description: 'Deleta um transporte pelo id',
          validate: {
            params: async (value: any) => {
              await validationPipe(value, ParamDto)
            },
          },
        },
        handler: deleteTransport,
      },
    ])
  },
}
