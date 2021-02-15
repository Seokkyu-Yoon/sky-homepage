import { Router } from 'express'
import createError from 'http-errors'
import { serviceBoard } from '@/service'

const router = Router()

router.get('/', async (req, res, next) => {
  const { id = -1, startIndex = 0 } = req.query
  try {
    const data = await serviceBoard.get(Number(id), Number(startIndex))
    res.send(data)
  } catch (e) {
    next(createError(e.status, e))
  }
})

router.post('/', async (req, res, next) => {
  const { title = '', description = '', contents = [] } = req.body
  const { accessToken = null } = req.cookies

  try {
    await serviceBoard.add(accessToken, title, description, contents)
    res.send({})
    return
  } catch (e) {
    next(createError(e.status, e))
  }
})

router.delete('/', async (req, res, next) => {
  const { id = -1, writter = '' } = req.body
  try {
    await serviceBoard.remove(id, writter)
    res.send({})
    return
  } catch (e) {
    next(createError(e.status, e))
  }
})

export default router
