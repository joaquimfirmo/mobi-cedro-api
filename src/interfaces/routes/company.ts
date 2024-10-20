import { Server } from 'hapi'
import { validationPipe } from '../../utils/validation'
import ParamDto from '../../application/dto/param-dto'
import CreateCompanyDto from '../../application/dto/create-company-dto'
import UpdateCompanyDto from '../../application/dto/update-company-dto'
import {
  findAllCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} from '../handlers/company'

module.exports = {
  name: 'company',
  version: '1.0.0',
  register: async function (server: Server) {
    server.route([
      {
        method: 'GET',
        path: '/empresas',
        options: {
          description: 'Lista todas as empresas',
        },
        handler: findAllCompany,
      },
      {
        method: 'POST',
        path: '/empresa',
        options: {
          description: 'Cria uma empresa',
          validate: {
            payload: async (value: any) => {
              await validationPipe(value, CreateCompanyDto)
            },
          },
        },
        handler: createCompany,
      },
      {
        method: 'PUT',
        path: '/empresa/{id}',
        options: {
          description: 'Atualiza uma empresa pelo id',
          validate: {
            params: async (value: any) => {
              await validationPipe(value, ParamDto)
            },
            payload: async (value: any) => {
              await validationPipe(value, UpdateCompanyDto)
            },
          },
        },
        handler: updateCompany,
      },
      {
        method: 'DELETE',
        path: '/empresa/{id}',
        options: {
          description: 'Deleta uma empresa pelo id',
          validate: {
            params: async (value: any) => {
              await validationPipe(value, ParamDto)
            },
          },
        },
        handler: deleteCompany,
      },
    ])
  },
}
