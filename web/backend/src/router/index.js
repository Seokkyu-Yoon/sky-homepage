import { Router } from 'express'
import apiRouter from './api'

const router = Router()

router.use('/api', apiRouter)

router.get('/*', (req, res, next) => {
  res.render('index.html')
})

export default router
