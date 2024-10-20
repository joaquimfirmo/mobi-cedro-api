import { Pool as PoolPG } from 'pg'
import 'dotenv/config'
export default class Pool {
  private static instance: PoolPG

  private constructor() {}

  public static getInstance(config: any): PoolPG {
    if (!Pool.instance) {
      console.log('Creating new pool')
      Pool.instance = new PoolPG({
        user: config.user,
        host: config.host || 'localhost',
        database: config.database || '',
        password: config.password || '',
        port: config.port || 5432,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      })
    }

    return Pool.instance
  }
}
