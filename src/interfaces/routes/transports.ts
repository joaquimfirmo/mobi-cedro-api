import { Container } from 'typedi'
import Joi from 'joi'
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
        options: {
          validate: {
            params: Joi.object({
              cityId: Joi.string().guid().required(),
            }),
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
            payload: Joi.object({
              cidade_origem: Joi.string().min(2).max(50).required(),
              cidade_destino: Joi.string().min(2).max(50).required(),
              dia_semana: Joi.string()
                .min(2)
                .max(50)
                .valid(
                  'Segunda-Feira',
                  'Terça-Feira',
                  'Quarta-Feira',
                  'Quinta-Feira',
                  'Sexta-Feira',
                  'Sábado',
                  'Domingo'
                )
                .required(),
              localizacao: Joi.string().min(2).max(50).required(),
              hora_saida: Joi.string()
                // eslint-disable-next-line no-useless-escape
                .pattern(/^([0-9]{2})\:([0-9]{2})\:([0-9]{2})$/)
                .required(),
              hora_chegada: Joi.string()
                // eslint-disable-next-line no-useless-escape
                .pattern(/^([0-9]{2})\:([0-9]{2})\:([0-9]{2})$/)
                .required(),
              preco: Joi.string()
                .pattern(/^\$\d+(?:\.\d{0,2})$/)
                .required(),
              nome: Joi.string().min(2).max(50).required(),
              id_empresa: Joi.string().guid().required(),
              id_veiculo: Joi.string().guid().required(),
              id_cidade: Joi.string().guid().required(),
            }),
          },
        },
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
        options: {
          validate: {
            params: Joi.object({
              id: Joi.string().guid().required(),
            }),
          },
        },
        handler:
          transportsController.deleteTransportById.bind(transportsController),
      },
    ])
  },
}
