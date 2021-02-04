import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import ejs from 'ejs'
import createError from 'http-errors'

import { serviceAuth } from './service'
import { ConfigCookie } from './config'
import { TokenNotFoundError } from './errors'
import router, { routerAuth } from './router'

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
  try {
    const { accessToken = null } = req.cookies
    if (accessToken === null) throw new TokenNotFoundError()
    const { refreshToken } = await serviceAuth.auth(accessToken)
    res.cookie('accessToken', refreshToken, ConfigCookie)
    next()
  } catch (e) {
    res.clearCookie('accessToken')
    next(createError(e.status, e))
  }
})

app.use('/', router)

app.use(async (err, req, res, next) => {
  res.status(err.status).send(err)
})

export default app
