import jwt from '@/core/jwt'
import mysql from '@/core/mysql'

import {
  InputIdError,
  InputNameError,
  InputPwError,
  InvalidSigninError,
  InvalidSignupError,
  InvalidTokenError
} from '@/errors'

const removeSpaces = (str) => str.replace(/(\s*)/g, '')

async function auth (accessToken) {
  if (accessToken === null) return {}

  try {
    const { data: { id, name } } = await jwt.verify(accessToken)
    const refreshToken = await jwt.publish({ id, name })
    return { id, name, refreshToken }
  } catch (e) {
    throw new InvalidTokenError()
  }
}

async function signin (inputId, inputPw) {
  const id = removeSpaces(inputId)
  const pw = removeSpaces(inputPw)
  if (!id) throw new InputIdError()
  if (!pw) throw new InputPwError()

  try {
    const { name } = await mysql.signIn({ id, pw })
    const accessToken = await jwt.publish({ id, name })
    return { id, name, accessToken }
  } catch (e) {
    throw new InvalidSigninError()
  }
}

async function signup (inputId, inputPw, inputName) {
  const id = removeSpaces(inputId)
  const pw = removeSpaces(inputPw)
  const name = removeSpaces(inputName)

  if (!id) throw new InputIdError()
  if (!pw) throw new InputPwError()
  if (!name) return new InputNameError()

  try {
    await mysql.signUp({ id, pw, name })
  } catch (e) {
    throw new InvalidSignupError()
  }
}

export default {
  auth,
  signin,
  signup
}
