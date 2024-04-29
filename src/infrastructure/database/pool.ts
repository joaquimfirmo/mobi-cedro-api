import { Pool as PoolPG } from 'pg'
import 'dotenv/config'
export default class Pool {
  private static instance: PoolPG

  private constructor() {}

  public static getInstance(): PoolPG {
    if (!Pool.instance) {
      Pool.instance = new PoolPG({
        connectionString: process.env.DATABASE_URL + '?ssl=require',

        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      })
    }

    return Pool.instance
  }
}
