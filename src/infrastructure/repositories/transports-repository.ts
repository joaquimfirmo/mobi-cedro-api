import ITransportsRepository from '../../application/repositories/transports-repository'
import Transport from '../../domain/entities/transports'

export default class TransportsRepository implements ITransportsRepository {
  constructor(private readonly connection: any) {}

  async create(data: Transport): Promise<any> {
    try {
      const result = await this.connection.execute(
        `INSERT INTO transportes (id,
              cidade_origem, 
              cidade_destino, 
              dia_semana, 
              localizacao, 
              hora_saida, 
              hora_chegada, 
              preco, 
              id_veiculo, 
              id_empresa, 
              id_cidade, 
              created_at,
              md5_hash) 
              VALUES ($1, $2 ,$3 ,$4 ,$5, $6, $7, $8, $9, $10 ,$11 ,NOW(), $12)  RETURNING *`,
        [
          data.id,
          data.cidadeOrigem,
          data.cidadeDestino,
          data.diaSemana,
          data.localizacao,
          data.horaSaida,
          data.horaChegada,
          data.preco,
          data.veiculoId,
          data.empresaId,
          data.cidadeId,
          data.md5_hash,
        ]
      )
      return result
    } catch (error) {
      console.log(error)
      return new Error('Erro ao criar transporte')
    }
  }

  async findAll(): Promise<any> {
    try {
      const result = await this.connection.execute(
        `SELECT transportes.cidade_origem,
              transportes.cidade_destino,
              transportes.dia_semana,
              transportes.localizacao,
              transportes.hora_saida,
              transportes.hora_chegada,
              transportes.preco,
              veiculos.nome,
              empresas.nome_fantasia as empresa
          FROM transportes
              INNER JOIN veiculos ON veiculos.id = transportes.id_veiculo
              INNER JOIN empresas ON empresas.id = transportes.id_empresa`
      )

      return result
    } catch (error) {
      console.log(error)
      return new Error('Erro ao buscar transportes')
    }
  }

  async findByCity(cityId: string): Promise<any> {
    try {
      const result = await this.connection.execute(
        `SELECT transportes.id,
              transportes.cidade_origem,
              transportes.cidade_destino, 
              transportes.dia_semana,
              transportes.localizacao,
              transportes.hora_saida,
              transportes.hora_chegada,
              transportes.preco,
              veiculos.nome,
              empresas.nome_fantasia as empresa,
              transportes.id_cidade
        FROM transportes
            INNER JOIN veiculos ON veiculos.id = transportes.id_veiculo
            INNER JOIN empresas ON empresas.id = transportes.id_empresa
            WHERE transportes.id_cidade = $1
            ORDER BY transportes.dia_semana ASC, transportes.hora_saida ASC`,
        [cityId]
      )

      return result
    } catch (error) {
      console.log(error)
      return new Error('Erro ao buscar transportes por cidade')
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const result = await this.connection.execute(
        `SELECT id FROM transportes WHERE id = $1`,
        [id]
      )
      return result
    } catch (error) {
      console.log(error)
      return new Error('Erro ao buscar transporte por id')
    }
  }

  async update(id: string, data: any): Promise<any> {
    try {
      const result = await this.connection.execute(
        `UPDATE transportes SET cidade_origem = $1, 
              cidade_destino = $2, 
              dia_semana = $3, 
              localizacao = $4, 
              hora_saida = $5, 
              hora_chegada = $6, 
              preco = $7, 
              id_veiculo = $8, 
              id_empresa = $9, 
              id_cidade = $10,
              updated_at = NOW() 
              WHERE id = $11 RETURNING *`,
        [
          data.cidade_origem,
          data.cidade_destino,
          data.dia_semana,
          data.localizacao,
          data.hora_saida,
          data.hora_chegada,
          data.preco,
          data.id_veiculo,
          data.id_empresa,
          data.id_cidade,
          id,
        ]
      )
      return result
    } catch (error) {
      console.log(error)
      return new Error('Erro ao atualizar transporte')
    }
  }

  async findByHash(hash: string): Promise<any> {
    try {
      const result = await this.connection.execute(
        `SELECT * FROM transportes WHERE md5_hash = $1`,
        [hash]
      )
      return result
    } catch (error) {
      console.log(error)
      return new Error('Erro ao buscar transporte por hash')
    }
  }
  async delete(id: string): Promise<any> {
    try {
      const result = await this.connection.execute(
        `DELETE FROM transportes WHERE id = $1`,
        [id]
      )
      return result
    } catch (error) {
      console.log(error)
      return new Error('Erro ao deletar transporte')
    }
  }
}
