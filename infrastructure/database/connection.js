const Pool = require('../database/pool')

class Connection {
  constructor(pool) {
    this.pool = pool
    this.conn = null
  }
  async connect() {
    this.conn = await this.pool.getConnection()
  }

  async query(statement, params) {
    return this.conn.execute(statement, params)
  }

  async beginTransaction() {
    await this.conn.beginTransaction()
  }

  async commit() {
    await this.conn.commit()
  }

  close() {
    this.pool.end()
  }
}

module.exports = Connection
