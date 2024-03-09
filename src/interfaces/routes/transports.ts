import { Container } from 'typedi'
import TransportsController from '../controllers/transports-controller'
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
        handler:
          transportsController.getTransportsByCity.bind(transportsController),
      },

      {
        method: 'POST',
        path: '/transporte',
        handler:
          transportsController.createTransport.bind(transportsController),
      },
      {
        method: 'PUT',
        path: '/transportes/{id}',
        handler:
          transportsController.updateTransportById.bind(transportsController),
      },
      {
        method: 'DELETE',
        path: '/transportes/{id}',
        handler:
          transportsController.deleteTransportById.bind(transportsController),
      },
    ])
  },
}
