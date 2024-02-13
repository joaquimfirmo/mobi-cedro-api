import { Inject, Service } from 'typedi'
import TransportsRepository from '../../repositories/transports-repository'
import Transport from '../../../domain/entities/transports'

@Service('usecase.createTransport')
export default class CreateTransport {
  constructor(
    @Inject('repository.transports')
    private readonly transportsRepository: TransportsRepository
  ) {}

  async execute(data: any): Promise<any> {
    try {
      const transport = Transport.create(
        data.cidade_origem,
        data.cidade_destino,
        data.dia_semana,
        data.localizacao,
        data.hora_saida,
        data.hora_chegada,
        data.preco,
        data.id_veiculo,
        data.id_empresa,
        data.id_cidade
      )

      const transportExist = await this.verifyTransportExists(data)

      if (transportExist) {
        return {
          message: 'Transporte já existe',
          status: 400,
          data: [],
        }
      }
      const result = await this.transportsRepository.create(transport)

      return {
        message: 'Transporte criado com sucesso',
        status: 201,
        data: result,
      }
    } catch (err) {
      console.log(err)
      return {
        message: 'Erro ao criar o transporte',
        status: 500,
        data: null,
      }
    }
  }

  private async verifyTransportExists(transport: any) {
    const transportExist =
      await this.transportsRepository.findTransport(transport)

    return transportExist.rowCount ? true : false
  }
}
