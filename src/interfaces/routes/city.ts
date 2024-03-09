import { Container } from 'typedi'
import CityController from '../controllers/city-controller'
import Joi from 'joi'
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
            payload: Joi.object({
              name: Joi.string().min(2).max(50).required(),
              uf: Joi.string().min(2).max(2).required(),
            }),
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
            params: Joi.object({
              id: Joi.string().guid().required(),
            }),
            payload: Joi.object({
              name: Joi.string().min(2).max(50).required(),
              uf: Joi.string().min(2).max(2).required(),
            }),
          },
        },
        handler: cityController.update.bind(cityController),
      },
      {
        method: 'DELETE',
        path: '/cidade/{id}',
        options: {
          validate: {
            params: Joi.object({
              id: Joi.string().guid().required(),
            }),
          },
        },
        handler: cityController.delete.bind(cityController),
      },
    ])
  },
}
