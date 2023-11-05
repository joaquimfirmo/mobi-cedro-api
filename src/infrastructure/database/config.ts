import 'dotenv/config'

export default {
  user: process.env.BD_USER,
  host: process.env.DB_HOST || 'localhost',
  database: process.env.BD_DATABASE || '',
  password: process.env.BD_PASSWORD || '',
  port: Number(process.env.BD_PORT) || 3306,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}
