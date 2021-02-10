import jwt from '@/core/jwt'
import mysql from '@/core/mysql'
import { FailToAddBoardError, FailToGetBoardError } from '@/errors'

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
    console.log(title, description, contents, writter)
    await mysql.addBoard({ title, description, contents, writter })
  } catch (e) {
    console.log(e)
    throw new FailToAddBoardError()
  }
}

export default {
  get,
  add
}
