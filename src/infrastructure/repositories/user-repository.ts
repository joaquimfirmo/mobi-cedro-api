import { badImplementation } from '@hapi/boom'
import Connection from '../database/connection'
import IUserRepository from '../../application/repositories/user-repository'
import ICache from '../../application/cache/cache'
import User from '../../domain/entities/user'

export default class UserRepository implements IUserRepository {
  constructor(
    private readonly connection: Connection,
    private readonly cache?: ICache
  ) {}

  async create(user: User): Promise<any> {
    try {
      const result = await this.connection.execute(
        `INSERT INTO usuarios (id, nome, email, senha, permissoes) VALUES ($1, $2, $3, $4, $5)`,
        [user.id, user.name, user.email, user.password, user.permissions]
      )

      return result
    } catch (error) {
      console.log(error)
      throw badImplementation('Erro ao criar usuário')
    }
  }

  async findAll(): Promise<any> {
    try {
      const result = await this.connection.execute(
        'SELECT id, nome, email, permissoes, created_at,updated_at  FROM usuarios'
      )

      return result
    } catch (error) {
      console.log(error)
      throw badImplementation('Erro ao buscar usuários')
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const result = await this.connection.execute(
        'SELECT id , nome, senha FROM usuarios WHERE id = $1',
        [id]
      )

      return result
    } catch (error) {
      console.log(error)
      throw badImplementation('Erro ao buscar usuários')
    }
  }

  async findByNameAndEmail(name: string, email: string): Promise<any> {
    try {
      const result = await this.connection.execute(
        'SELECT * FROM usuarios WHERE nome = $1 AND email = $2',
        [name, email]
      )

      return result
    } catch (error) {
      console.log(error)
      throw badImplementation('Erro ao buscar usuários')
    }
  }

  async findByEmail(email: string): Promise<any> {
    try {
      const result = await this.connection.execute(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
      )

      return result
    } catch (error) {
      console.log(error)
      throw badImplementation('Erro ao buscar usuário por email')
    }
  }

  async update(id: string, user: User): Promise<any> {
    try {
      const result = await this.connection.execute(
        'UPDATE usuarios SET nome = $1, permissoes = $2 , updated_at = NOW() WHERE id = $3 RETURNING id, nome, email, permissoes',
        [user.name, user.permissions, id]
      )

      return result
    } catch (error) {
      console.log(error)
      throw badImplementation('Erro ao atualizar usuário')
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const result = await this.connection.execute(
        'DELETE FROM usuarios WHERE id = $1',
        [id]
      )

      return result
    } catch (error) {
      console.log(error)
      throw badImplementation('Erro ao deletar usuário')
    }
  }
}
