import { Server, Request, ResponseToolkit } from 'hapi'
import { Container } from 'typedi'
import { validationPipe } from '../../utils/validation'
import CreateUserDto from '../../application/dto/create-user-dto'
import UpdateUserDto from '../../application/dto/update-user-dto'
import LoginDto from '../../application/dto/login-dto'
import ParamDto from '../../application/dto/param-dto'
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
          validate: {
            payload: async (value: any) => {
              await validationPipe(value, CreateUserDto)
            },
          },
        },
        handler: (request: Request, h: ResponseToolkit) =>
          userController.create(request, h),
      },

      {
        method: 'POST',
        path: '/usuario/login',
        options: {
          description: 'Faz login',
          auth: false,
          validate: {
            payload: async (value: any) => {
              await validationPipe(value, LoginDto)
            },
          },
        },
        handler: (request: Request, h: ResponseToolkit) =>
          userController.login(request, h),
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
          validate: {
            params: async (value: any) => {
              await validationPipe(value, ParamDto)
            },
            payload: async (value: any) => {
              await validationPipe(value, UpdateUserDto)
            },
          },
        },
        handler: (request: Request, h: ResponseToolkit) =>
          userController.update(request, h),
      },

      {
        method: 'DELETE',
        path: '/usuario/{id}',
        options: {
          description: 'Deleta um usuário',
          validate: {
            params: async (value: any) => {
              await validationPipe(value, ParamDto)
            },
          },
        },
        handler: (request: Request, h: ResponseToolkit) =>
          userController.delete(request, h),
      },
    ])
  },
}
