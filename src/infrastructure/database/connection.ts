import { Service } from 'typedi'
import Pool from './pool'
import config from './config'

@Service()
export default class Connection {
  pool: any
  conection: any
  constructor() {
    this.pool = Pool.getInstance(config)
  }

  async connect(): Promise<void> {
    this.conection = await this.pool.connect()
  }

  async execute(query: string, values?: any[]): Promise<any> {
    const { rowCount, rows } = await this.conection.query(query, values)
    return { rowCount, rows }
  }

  async end(): Promise<void> {
    await this.conection.end()
  }
}
