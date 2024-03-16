import { Server, Request, ResponseToolkit } from 'hapi'
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
  register: async function (server: Server) {
    server.route([
      {
        method: 'GET',
        path: '/empresas',
        handler: (request: Request, h: ResponseToolkit) =>
          companyController.getAll(request, h),
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
        handler: (request: Request, h: ResponseToolkit) =>
          companyController.create(request, h),
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
        handler: (request: Request, h: ResponseToolkit) =>
          companyController.update(request, h),
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
        handler: (request: Request, h: ResponseToolkit) =>
          companyController.delete(request, h),
      },
    ])
  },
}
