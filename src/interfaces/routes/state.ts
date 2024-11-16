import { Server } from 'hapi'
import { findAllState } from '../handlers/state/findAll-state'

module.exports = {
  name: 'state',
  version: '1.0.0',
  register: async function (server: Server) {
    server.route([
      {
        method: 'GET',
        path: '/estados',
        options: {
          description: 'Lista todos os estados',
          auth: false,
          plugins: {
            rbac: 'none',
          },
        },
        handler: findAllState,
      },
    ])
  },
}
