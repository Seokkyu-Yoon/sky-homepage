import { Router } from 'express'
import mysql from '@/core/mysql'
const router = Router()

router.get('/', async (req, res) => {
  const { id = -1, startIndex = 0 } = req.query
  try {
    if (Number(id) === -1) {
      const boards = await mysql.getBoards({ startIndex: Number(startIndex) })
      res.send(boards)
      return
    }
    const board = await mysql.getBoard({ id })
    res.send(board)
  } catch (e) {
    res.status(403).send(e.message)
  }
})

router.post('/', async (req, res) => {
  const { title = '', description = '', photos = [] } = req.body
  try {
    await mysql.addBoard({ title, description, photos })
    res.send('success')
    return
  } catch (e) {
    res.status(403).send(e.message)
  }
})

export default router
