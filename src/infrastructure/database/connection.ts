import { Pool } from 'pg'
import config from './config'

export default class Connection {
  pool: any
  conection: any
  constructor() {
    this.pool = new Pool(config)
  }

  async connect(): Promise<void> {
    this.conection = await this.pool.connect()
  }

  async execute(query: string, values: any[]): Promise<any> {
    const { rows: result } = await this.conection.query(query, values)
    return result
  }

  async end(): Promise<void> {
    await this.conection.release()
  }
}
