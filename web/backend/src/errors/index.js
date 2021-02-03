import { CODE_MAP, MESSAGE_MAP } from './map'
import createError from 'http-errors'

const BAD_REQUEST = 400
const FORBIDDEN = 403

class CustomError extends Error {
  constructor (mapKey, ...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }

    this.code = CODE_MAP[mapKey]
    this.message = MESSAGE_MAP[mapKey]
  }
}

const createErrorTokenNotFound = () => createError(BAD_REQUEST, new CustomError('TOKEN_NOT_FOUND'))
const createErrorInvalidToken = () => createError(FORBIDDEN, new CustomError('INVALID_TOKEN'))
const createErrorInvalidSignIn = () => createError(BAD_REQUEST, new CustomError('INVALID_SIGN_IN'))
const createErrorInvalidSignUp = () => createError(BAD_REQUEST, new CustomError('INVALID_SIGN_UP'))
const createErrorInputId = () => createError(BAD_REQUEST, new CustomError('INPUT_ID'))
const createErrorInputPw = () => createError(BAD_REQUEST, new CustomError('INPUT_PW'))
const createErrorInputName = () => createError(BAD_REQUEST, new CustomError('INPUT_NAME'))

export {
  createError,
  createErrorTokenNotFound,
  createErrorInvalidToken,
  createErrorInvalidSignIn,
  createErrorInvalidSignUp,
  createErrorInputId,
  createErrorInputPw,
  createErrorInputName
}
