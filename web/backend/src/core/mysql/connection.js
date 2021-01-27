import mysql from 'mysql'

import { ConfigMysql } from '@/config'

function Connection () {
  this.connection = mysql.createConnection(ConfigMysql)
  this.connection.connect()
}

Connection.prototype.query = function (sql) {
  return new Promise((resolve, reject) => {
    this.connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result)
    })
    this.connection.end()
  })
}

export default Connection
