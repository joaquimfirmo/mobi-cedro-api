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
    const transport = new Transport(
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

    const transportExist = await this.verifyTransportExists(transport)

    if (transportExist) {
      console.log(
        'Transporte com o md5 informado já existe:',
        transport.md5_hash
      )
      console.log('Transporte já existe', data)
      return {
        message: 'Transporte já existe',
        status: 400,
        data,
      }
    }

    const result = await this.transportsRepository.create(transport)

    return {
      message: 'Transporte criado com sucesso',
      status: 201,
      data: result,
    }
  }

  private async verifyTransportExists(transport: any) {
    const result = await this.transportsRepository.findByHash(
      transport.md5_hash
    )

    return result.rowCount > 0 ? true : false
  }
}
