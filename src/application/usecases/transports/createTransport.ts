import { Service } from 'typedi'
import { InjectRepository } from '../../../infrastructure/di/decorators/inject-repository'
import ITransportsRepository from '../../repositories/transports-repository'
import TransportsRepository from '../../../infrastructure/repositories/transports-repository'
import Transport from '../../../domain/entities/transports'

@Service()
export default class CreateTransport {
  constructor(
    @InjectRepository(TransportsRepository)
    private readonly transportsRepository: ITransportsRepository
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
        data,
        message: 'Transporte já existe',
        status: 400,
      }
    }

    const result = await this.transportsRepository.create(transport)

    return {
      data: result.rows[0],
      message: 'Transporte criado com sucesso',
      status: 201,
    }
  }

  private async verifyTransportExists(transport: any) {
    const result = await this.transportsRepository.findByHash(
      transport.md5_hash
    )

    return result.rowCount > 0 ? true : false
  }
}
