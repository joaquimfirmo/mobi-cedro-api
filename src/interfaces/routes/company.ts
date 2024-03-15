import { Container } from 'typedi'
import { validationPipe } from '../../utils/validation'
import ParamDto from '../../application/dto/param-dto'
import CreateCompanyDto from '../../application/dto/create-company-dto'
import UpdateCompanyDto from '../../application/dto/update-company-dto'
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
            payload: async (value: any) => {
              await validationPipe(value, CreateCompanyDto)
            },
          },
        },
        handler: companyController.create.bind(companyController),
      },
      {
        method: 'PUT',
        path: '/empresa/{id}',
        options: {
          validate: {
            params: async (value: any) => {
              await validationPipe(value, ParamDto)
            },
            payload: async (value: any) => {
              await validationPipe(value, UpdateCompanyDto)
            },
          },
        },
        handler: companyController.update.bind(companyController),
      },
      {
        method: 'DELETE',
        path: '/empresa/{id}',
        options: {
          validate: {
            params: async (value: any) => {
              await validationPipe(value, ParamDto)
            },
          },
        },
        handler: companyController.delete.bind(companyController),
      },
    ])
  },
}
