import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import ejs from 'ejs'

import mysql from '@/core/mysql'
import jwt from '@/core/jwt'

import router, { routerAuth } from './router'
import {
  createErrorInvalidToken,
  createErrorTokenNotFound
} from '@/errors'

const maxAge = 2592000000

const app = express()

// CORS
app.use(cors({
  origin: true,
  credentials: true
}))

// view engine setup
app.set('views', path.join(__dirname, '..', 'public'))
app.engine('html', ejs.renderFile)
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/auth', routerAuth)

app.all('/*', async (req, res, next) => {
  const { accessToken = null } = req.cookies
  if (accessToken === null) return next(createErrorTokenNotFound())

  try {
    const { data: { id, pw, name } } = await jwt.verify(accessToken)
    const newAccessToken = await jwt.publish({ id, pw, name })
    await mysql.signIn({ id, pw })
    res.cookie('accessToken', newAccessToken, { maxAge })
    next()
  } catch (e) {
    res.clearCookie('accessToken')
    next(createErrorInvalidToken())
  }
})

app.use('/', router)

app.use(async (err, req, res, next) => {
  console.log(JSON.stringify(err))
  res.status(err.status).send(err)
})

export default app
