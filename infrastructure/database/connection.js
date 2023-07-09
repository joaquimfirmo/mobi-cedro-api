const mysql = require("mysql2/promise");
require("dotenv").config();

class Connection {
  static async open() {
    this.host = process.env.BD_HOST ? process.env.BD_HOST : "localhost";
    this.user = process.env.BD_USER ? process.env.BD_USER : "root";
    this.database = process.env.BD_DATABASE ? process.env.BD_DATABASE : " ";
    this.password = process.env.BD_PASSWORD ? process.env.BD_PASSWORD : " ";

    this.port = process.env.BD_PORT ? process.env.BD_PORT : 3306;

    this.conn = mysql.createPool({
      connectionLimit: 50,
      host: this.host,
      user: this.user,
      database: this.database,
      password: this.password,
      port: this.port,
    });
    return this.conn.getConnection();
  }
}

module.exports = Connection;
