import { Server } from 'hapi'
import { validationPipe } from '../../utils/validation'
import CreateUserDto from '../../application/dto/create-user-dto'
import UpdateUserDto from '../../application/dto/update-user-dto'
import LoginDto from '../../application/dto/login-dto'
import ParamDto from '../../application/dto/param-dto'
import {
  loginUser,
  findAllUsers,
  updateUser,
  createUser,
  deleteUser,
} from '../handlers/user'

// RBAC plugin for authorization control
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
          plugins: {
            rbac: {
              target: { 'credentials:group': 'SUPER_ADMIN' },
              apply: 'deny-overrides',
              effect: 'permit',
            },
          },
          validate: {
            payload: async (value: any) => {
              await validationPipe(value, CreateUserDto)
            },
          },
        },
        handler: createUser,
      },

      {
        method: 'POST',
        path: '/usuario/login',
        options: {
          description: 'Faz login',
          auth: false,
          plugins: {
            rbac: 'none',
          },
          validate: {
            payload: async (value: any) => {
              await validationPipe(value, LoginDto)
            },
          },
        },
        handler: loginUser,
      },

      {
        method: 'GET',
        path: '/usuarios',
        options: {
          description: 'Busca todos os usuários',
        },
        handler: findAllUsers,
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
        handler: updateUser,
      },

      {
        method: 'DELETE',
        path: '/usuario/{id}',
        options: {
          description: 'Deleta um usuário',
          plugins: {
            rbac: {
              target: { 'credentials:group': 'SUPER_ADMIN' },
              apply: 'deny-overrides',
              effect: 'permit',
            },
          },
          validate: {
            params: async (value: any) => {
              await validationPipe(value, ParamDto)
            },
          },
        },
        handler: deleteUser,
      },
    ])
  },
}
