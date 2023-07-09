const Connection = require("./connection");

class Transaction {
  static conn;

  static async open() {
    if (!this.conn) {
      this.conn = await Connection.open();
    }

    await this.conn.beginTransaction();
  }

  static get() {
    return this.conn;
  }

  static async rollback() {
    if (this.conn) {
      await this.conn.rollback();
      this.conn = null;
    }
  }

  static async close() {
    try {
      if (this.conn) {
        await this.conn.commit();
        this.conn.release();
        // this.conn = null;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Transaction;
