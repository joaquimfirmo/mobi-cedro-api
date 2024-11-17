import { Service } from 'typedi'
import IBGEService from '../../../infrastructure/services/ibge-service'

@Service()
export default class FindAllCitiesByState {
  constructor(private readonly ibgeService: IBGEService) {}

  async execute(uf: string) {
    const data = await this.ibgeService.getCitiesByState(uf)
    if (data.length === 0) {
      return {
        data,
        message: 'Nenhuma cidade encontrada',
        status: 404,
      }
    }
    const cities = data.map((city: any) => {
      return {
        codigo: city.id,
        nome: city.nome,
        uf: city.microrregiao.mesorregiao.UF.sigla,
        mesorregiao: city.microrregiao.mesorregiao.nome,
        regiao: city.microrregiao.mesorregiao.UF.regiao.nome,
      }
    })
    return {
      message: `${cities.length} cidades encontradas`,
      data: cities,
      status: 200,
    }
  }
}
