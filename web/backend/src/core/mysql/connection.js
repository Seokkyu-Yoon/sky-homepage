import mysql from 'mysql'

import { ConfigMysql } from '@/config'

function Connection () {
  this.connection = mysql.createConnection(ConfigMysql)
  this.connection.connect()
}

function query ({ connection, sql = '', params = [] }) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

function transaction ({ connection, sqlParamSets = [] }) {
  return new Promise((resolve, reject) => {
    connection.beginTransaction(async (err) => {
      const results = []
      for (const { sql, params } of sqlParamSets) {
        try {
          const result = await query({ connection, sql, params })
          results.push(result)
        } catch (e) {
          connection.rollback()
          reject(e)
        }
      }

      if (err) {
        connection.rollback()
        reject(err)
      } else {
        connection.commit()
        resolve(results)
      }
    })
  })
}
Connection.prototype.query = async function ({ sql = '', params = [] }) {
  const result = await query({
    connection: this.connection,
    sql,
    params
  })
  this.connection.end()
  return result
}

Connection.prototype.transaction = async function (sqlParamSets) {
  const results = await transaction({
    connection: this.connection,
    sqlParamSets
  })
  this.connection.end()
  return results
}

export default Connection
