import { Router } from 'express'
import mysql from '@/core/mysql'
const router = Router()

router.get('/', async (req, res) => {
  const { id, pw } = req.query
  try {
    const user = await mysql.signIn({ id, pw })
    res.send(user)
  } catch (e) {
    res.status(403).send(e.message)
  }
})

router.post('/', async (req, res) => {
  const { id, pw, name } = req.body
  try {
    await mysql.signUp({ id, pw, name })
    res.send('success')
  } catch (e) {
    res.status(403).send(e.message)
  }
})

export default router
