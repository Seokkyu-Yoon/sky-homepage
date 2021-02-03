import { Router } from 'express'
import {
  createErrorInputId,
  createErrorInputName,
  createErrorInputPw,
  createErrorInvalidSignIn,
  createErrorInvalidSignUp,
  createErrorInvalidToken
} from '@/errors'

import mysql from '@/core/mysql'
import jwt from '@/core/jwt'

const maxAge = 2592000000

const router = Router()

router.post('/', async (req, res, next) => {
  const { accessToken = null } = req.cookies
  if (accessToken === null) return res.send({})

  try {
    const { data: { id, pw } } = await jwt.verify(accessToken)
    const { name } = await mysql.signIn({ id, pw })
    res.send({ id, name })
  } catch (e) {
    res.clearCookie('accessToken')
    next(createErrorInvalidToken())
  }
})

router.post('/signin', async (req, res, next) => {
  try {
    const { id = '', pw = '' } = req.body
    if (!id) return next(createErrorInputId())
    if (!pw) return next(createErrorInputPw())

    const { name } = await mysql.signIn({ id, pw })
    const accessToken = await jwt.publish({ id, pw, name })

    res.cookie('accessToken', accessToken, { maxAge })
    res.send({ id, name })
  } catch (e) {
    next(createErrorInvalidSignIn())
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const { id = '', pw = '', name = '' } = req.body
    if (!id) return next(createErrorInputId())
    if (!pw) return next(createErrorInputPw())
    if (!name) return next(createErrorInputName())

    await mysql.signUp({ id, pw, name })
    res.redirect(307, '/auth/signin')
  } catch (e) {
    next(createErrorInvalidSignUp())
  }
})

export default router
