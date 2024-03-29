import jwt from '@/core/jwt'
import mysql from '@/core/mysql'
import { FailToAddBoardError, FailToGetBoardError, FailToRemoveBoardError } from '@/errors'

function get (id, startIndex) {
  try {
    return id === -1
      ? mysql.getBoards({ startIndex })
      : mysql.getBoard({ id })
  } catch (e) {
    throw new FailToGetBoardError()
  }
}

async function add (accessToken, title, description, contents) {
  try {
    const { data: { id: writter } } = await jwt.verify(accessToken)
    await mysql.addBoard({ title, description, contents, writter })
  } catch (e) {
    throw new FailToAddBoardError()
  }
}

async function remove (id, writter) {
  try {
    await mysql.removeBoard({ id, writter })
  } catch (e) {
    throw new FailToRemoveBoardError()
  }
}

export default {
  get,
  add,
  remove
}
