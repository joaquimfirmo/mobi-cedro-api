import { Container } from 'typedi'
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
        handler: companyController.create.bind(companyController),
      },
      {
        method: 'PUT',
        path: '/empresa/{id}',
        handler: companyController.update.bind(companyController),
      },
      {
        method: 'DELETE',
        path: '/empresa/{id}',
        handler: companyController.delete.bind(companyController),
      },
    ])
  },
}
