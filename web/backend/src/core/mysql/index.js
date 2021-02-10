import Connection from './connection'
import getSqlParams from './sqlParams'
import logger from '@/core/logger'

const TABLE_CREATE_MAP = {
  user: exec.bind(null, 'createTableUser'),
  board: exec.bind(null, 'createTableBoard'),
  content: exec.bind(null, 'createTableContent'),
  board_content: exec.bind(null, 'createTableBoardContent')
}

async function exec (action = '', payload = {}) {
  const connection = new Connection()
  const sqlParams = getSqlParams(action, payload)
  const result = await connection.query(sqlParams)
  return result
}

async function transaction (actions = [], payload = {}) {
  const connection = new Connection()
  const sqlParams = actions.map((action) => getSqlParams(action, payload))
  const results = await connection.transaction(sqlParams)
  return results
}

const init = async (payload = {}) => {
  const mysqlTables = await exec('selectAllTableNames', payload)
  for (const tableCreateKey in TABLE_CREATE_MAP) {
    const isExists = mysqlTables.some(({ tableName }) => tableName === tableCreateKey)
    if (isExists) {
      logger.info(`${tableCreateKey} already exists`)
      continue
    }
    const createTable = TABLE_CREATE_MAP[tableCreateKey]
    if (typeof createTable !== 'function') throw new Error('not defined create table')
    await createTable(payload)
    logger.info(`${tableCreateKey} create done`)
  }
}

const signIn = async (payload = {}) => {
  const result = await exec('selectUser', payload)
  const user = result[0]
  if (typeof user === 'undefined') throw new Error('User not exists')
  if (user.pw !== payload.pw) throw new Error('Invalid to signIn')
  return user
}
const signUp = async (payload = {}) => await exec('insertUser', payload)

const getBoards = async (payload = {}) => {
  const boards = await exec('selectBoards', payload)
  const count = boards.length
  return { boards, count }
}
const getBoard = async (payload = {}) => {
  const result = await exec('selectBoard', payload)
  const board = result[0]
  return board
}
const addBoard = async (payload = {}) => {
  const actionsInsertBoard = [
    'insertBoard',
    'setBoardId'
  ]
  console.log(payload)
  await transaction(actionsInsertBoard, payload)

  if (payload.contents.length < 1) return
  const actionsInsertContents = [
    'insertContent',
    'setContentId',
    'insertBoardContent'
  ]
  await Promise.all(
    payload.contents.map(
      (content) => {
        // todo upload files first
        return transaction(actionsInsertContents, { ...payload, ...content })
      })
  )
}

export default {
  init,

  signIn,
  signUp,

  getBoards,
  getBoard,
  addBoard
}
