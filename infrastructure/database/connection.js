const Pool = require('../database/pool')

class Connection {
  async connect() {
    const pool = Pool.create()
    this.conn = await pool.getConnection()
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
    this.conn.release()
  }
}

module.exports = Connection
