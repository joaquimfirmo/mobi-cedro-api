export default class Connection {
  constructor(private readonly pool: any) {}

  async connect(): Promise<void> {
    await this.pool.connect()
  }

  async execute(query: string, values: any[]): Promise<any> {
    const { rows: result } = await this.pool.query(query, values)
    return result
  }

  async end(): Promise<void> {
    await this.pool.end()
  }
}
