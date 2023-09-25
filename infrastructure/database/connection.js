class Connection {
  constructor(pool) {
    this.pool = pool
    this.conn = null
  }
  async connect() {
    this.conn = await this.pool.connect()
  }

  async query(statement, params) {
    return this.conn.query(statement, params)
  }

  close() {
    this.conn.release()
  }
}

module.exports = Connection
