import { Service } from 'typedi'
import State from '../../../types/states.type'
import estados from '../../../utils/estados.json'

@Service()
export default class States {
  constructor() {}

  execute() {
    const data: State[] = estados.data

    return {
      data,
      message: 'Estados encontrados com sucesso',
      status: 200,
    }
  }
}
