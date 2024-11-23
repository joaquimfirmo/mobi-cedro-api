import { Server } from 'hapi'
import { findAllState, findAllCitiesByState } from '../handlers/locations'

module.exports = {
  name: 'state',
  version: '1.0.0',
  register: async function (server: Server) {
    server.route([
      {
        method: 'GET',
        path: '/localidades/estados',
        options: {
          description: 'Lista todos os estados',
          auth: false,
          plugins: {
            rbac: 'none',
          },
        },
        handler: findAllState,
      },
      {
        method: 'GET',
        path: '/localidades/estados/{uf}/cidades',
        options: {
          description: 'Lista todas as cidades de um estado',
          auth: false,
          plugins: {
            rbac: 'none',
          },
        },
        handler: findAllCitiesByState,
      },
    ])
  },
}
