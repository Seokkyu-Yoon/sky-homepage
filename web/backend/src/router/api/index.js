import { Router } from 'express'

import signRouter from './sign'
import boardRouter from './board'

const router = Router()

router.use('/sign', signRouter)
router.use('/board', boardRouter)
export default router
