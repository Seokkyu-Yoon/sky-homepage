import { Router } from 'express'
import createError from 'http-errors'

import { serviceAuth } from '@/service'
import { ConfigCookie } from '@/config'

const TEMPORARY_REDIRECT = 307
const router = Router()

router.post('/', async (req, res, next) => {
  try {
    const { accessToken = null } = req.cookies
    console.log(accessToken)
    const { id, name, refreshToken } = await serviceAuth.auth(accessToken)
    res.cookie('accessToken', refreshToken, ConfigCookie)
    res.send({ id, name })
  } catch (e) {
    res.clearCookie('accessToken')
    next(createError(e.status, e))
  }
})

router.post('/signin', async (req, res, next) => {
  try {
    const {
      id: inputId = '',
      pw: inputPw = ''
    } = req.body

    const { id, name, accessToken } = await serviceAuth.signin(inputId, inputPw)
    res.cookie('accessToken', accessToken, ConfigCookie)
    res.send({ id, name })
  } catch (e) {
    console.log(e)
    res.clearCookie('accessToken')
    next(createError(e.status, e))
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const {
      id: inputId = '',
      pw: inputPw = '',
      name: inputName = ''
    } = req.body

    await serviceAuth.signup(inputId, inputPw, inputName)
    res.redirect(TEMPORARY_REDIRECT, '/auth/signin')
  } catch (e) {
    next(createError(e.status, e))
  }
})

export default router
