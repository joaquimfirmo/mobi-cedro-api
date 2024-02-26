import { Container } from 'typedi'
import CityController from '../controllers/city-controller'
const cityController = Container.get(CityController)

module.exports = {
  name: 'city',
  version: '1.0.0',
  register: async function (server: any) {
    server.route([
      {
        method: 'POST',
        path: '/cidade',
        handler: cityController.create.bind(cityController),
      },
      {
        method: 'GET',
        path: '/cidades',
        handler: cityController.findAll.bind(cityController),
      },
      {
        method: 'PUT',
        path: '/cidade/{id}',
        handler: cityController.update.bind(cityController),
      },
      {
        method: 'DELETE',
        path: '/cidade/{id}',
        handler: cityController.delete.bind(cityController),
      },
    ])
  },
}
