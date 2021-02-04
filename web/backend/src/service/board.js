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

async function add (title, description, mediaList) {
  try {
    await mysql.addBoard({ title, description, mediaList })
  } catch (e) {
    throw new FailToAddBoardError()
  }
}

export default {
  get,
  add
}
