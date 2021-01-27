import mysql from './index'
import logger from '@/core/logger'

const tables = [
  'user',
  'board',
  'photo',
  'board_user',
  'board_photo'
]

const createTableMap = {
  user: mysql.createTableUser,
  board: mysql.createTableBoard,
  photo: mysql.createTablePhoto,
  board_user: mysql.createTableBoardUser,
  board_photo: mysql.createTableBoardPhoto
}

async function getMysqlTables () {
  const result = await mysql.selectAllTableNames({ database: process.env.MYSQL_DATABASE })
  const mysqlTables = result.map(({ tableName }) => tableName)
  return mysqlTables
}

async function getExcludedTables (tables = [], mysqlTables = []) {
  return tables.reduce((bucket, tableName) => {
    const isExists = mysqlTables.some((name) => name === tableName)
    if (!isExists) bucket.push(tableName)
    return bucket
  }, [])
}

async function createTable (tableName) {
  const createTable = createTableMap[tableName]
  if (typeof createTable === 'undefined') throw new Error('not defined table')
  await createTable()
}

async function createExcludedTables (excludedTables = []) {
  let index = 0
  while (index < excludedTables.length) {
    const tableName = excludedTables[index]
    await createTable(tableName)
    logger.info(`${tableName} create done`)
    index += 1
  }
}

async function init () {
  logger.info('start init mysql')
  const mysqlTables = await getMysqlTables()
  const excludedTables = await getExcludedTables(tables, mysqlTables)
  await createExcludedTables(excludedTables)
  logger.info('finish init mysql')
}

export default init
