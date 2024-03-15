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
  register: async function (server: any) {
    server.route([
      {
        method: 'POST',
        path: '/cidade',
        options: {
          validate: {
            payload: async (value: any) => {
              await validationPipe(value, CreateCityDto)
            },
          },
        },
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
        options: {
          validate: {
            params: async (value: any) => {
              await validationPipe(value, ParamDto)
            },
            payload: async (value: any) => {
              await validationPipe(value, UpdateCityDto)
            },
          },
        },
        handler: cityController.update.bind(cityController),
      },
      {
        method: 'DELETE',
        path: '/cidade/{id}',
        options: {
          validate: {
            params: async (value: any) => {
              await validationPipe(value, ParamDto)
            },
          },
        },
        handler: cityController.delete.bind(cityController),
      },
    ])
  },
}
