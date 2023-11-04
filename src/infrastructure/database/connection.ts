export default class Connection {
  conection: any
  constructor(private readonly pool: any) {}

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
