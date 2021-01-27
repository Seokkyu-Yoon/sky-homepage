import Connection from './connection'
import getSql from './sqls'

async function selectAllTableNames (payload = { database: '' }) {
  const connection = new Connection()
  const sql = getSql('selectAllTableNames', payload)
  const result = await connection.query(sql)
  return result
}

async function createTableUser (payload = {}) {
  const connection = new Connection()
  const sql = getSql('createTableUser', payload)
  await connection.query(sql)
}

async function createTableBoard (payload = {}) {
  const connection = new Connection()
  const sql = getSql('createTableBoard', payload)
  await connection.query(sql)
}

async function createTablePhoto (payload = {}) {
  const connection = new Connection()
  const sql = getSql('createTablePhoto', payload)
  await connection.query(sql)
}

async function createTableBoardUser (payload = {}) {
  const connection = new Connection()
  const sql = getSql('createTableBoardUser', payload)
  await connection.query(sql)
}

async function createTableBoardPhoto (payload = {}) {
  const connection = new Connection()
  const sql = getSql('createTableBoardPhoto', payload)
  await connection.query(sql)
}

export default {
  selectAllTableNames,
  createTableUser,
  createTableBoard,
  createTablePhoto,
  createTableBoardUser,
  createTableBoardPhoto
}
