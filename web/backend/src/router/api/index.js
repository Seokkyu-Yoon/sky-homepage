import { Router } from 'express'

import routerBoard from './board'

const router = Router()

router.use('/board', routerBoard)
export default router
