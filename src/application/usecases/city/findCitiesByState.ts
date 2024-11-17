import { Service } from 'typedi'
import IBGEService from '../../../infrastructure/services/ibge-service'

@Service()
export default class FindCitiesByState {
  constructor(private readonly ibgeService: IBGEService) {}

  async execute(uf: string): Promise<any> {
    const response: any[] = await this.ibgeService.getCitiesByState(uf)
    const cities = response.map((city: any) => {
      return {
        codigo: city.id,
        nome: city.nome,
        uf: city.microrregiao.mesorregiao.UF.sigla,
        mesorregiao: city.microrregiao.mesorregiao.nome,
        regiao: city.microrregiao.mesorregiao.UF.regiao.nome,
      }
    })
    return {
      data: cities,
      message: 'Cidades encontradas',
      status: 200,
    }
  }
}
