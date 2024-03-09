import { Container } from 'typedi'
import Joi from 'joi'
import CompanyController from '../controllers/company-controller'
const companyController = Container.get(CompanyController)

module.exports = {
  name: 'company',
  version: '1.0.0',
  register: async function (server: any) {
    server.route([
      {
        method: 'GET',
        path: '/empresas',
        handler: companyController.getAll.bind(companyController),
      },
      {
        method: 'POST',
        path: '/empresa',
        options: {
          validate: {
            payload: Joi.object({
              razaoSocial: Joi.string().min(2).max(50).required(),
              nomeFantasia: Joi.string().min(2).max(50).required(),
              cnpj: Joi.string().min(14).max(14).required(),
              idCidade: Joi.string().guid().required(),
            }),
          },
        },
        handler: companyController.create.bind(companyController),
      },
      {
        method: 'PUT',
        path: '/empresa/{id}',
        options: {
          validate: {
            params: Joi.object({
              id: Joi.string().guid().required(),
            }),
            payload: Joi.object({
              razaoSocial: Joi.string().min(2).max(50).required(),
              nomeFantasia: Joi.string().min(2).max(50).required(),
              cnpj: Joi.string().min(14).max(14).required(),
              idCidade: Joi.string().guid().required(),
            }),
          },
        },
        handler: companyController.update.bind(companyController),
      },
      {
        method: 'DELETE',
        path: '/empresa/{id}',
        options: {
          validate: {
            params: Joi.object({
              id: Joi.string().guid().required(),
            }),
          },
        },
        handler: companyController.delete.bind(companyController),
      },
    ])
  },
}
