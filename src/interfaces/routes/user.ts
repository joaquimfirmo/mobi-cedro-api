import { Server, Request, ResponseToolkit } from 'hapi'
import { Container } from 'typedi'
import UserController from '../controllers/user-controller'

const userController = Container.get(UserController)

module.exports = {
  name: 'user',
  version: '1.0.0',
  register: async function (server: Server) {
    server.route([
      {
        method: 'POST',
        path: '/usuario',
        options: {
          description: 'Cria um usuário',
        },
        handler: (request: Request, h: ResponseToolkit) =>
          userController.create(request, h),
      },

      {
        method: 'GET',
        path: '/usuarios',
        options: {
          description: 'Busca todos os usuários',
        },
        handler: (request: Request, h: ResponseToolkit) =>
          userController.findAll(request, h),
      },

      {
        method: 'PUT',
        path: '/usuario/{id}',
        options: {
          description: 'Atualiza um usuário',
        },
        handler: (request: Request, h: ResponseToolkit) =>
          userController.update(request, h),
      },

      {
        method: 'DELETE',
        path: '/usuario/{id}',
        options: {
          description: 'Deleta um usuário',
        },
        handler: (request: Request, h: ResponseToolkit) =>
          userController.delete(request, h),
      },
    ])
  },
}
