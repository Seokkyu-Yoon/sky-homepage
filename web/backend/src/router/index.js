import { Router } from 'express'
import routerApi from './api'
import routerAuth from './auth'

const router = Router()

router.use('/api', routerApi)

router.get('/*', (req, res, next) => {
  res.render('index.html')
})

export { routerAuth }
export default router
