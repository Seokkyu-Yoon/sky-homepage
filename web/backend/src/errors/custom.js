import { STATE_MAP, CODE_MAP, MESSAGE_MAP } from './maps'

export default class CustomError extends Error {
  constructor (mapKey, ...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }

    console.log(mapKey, STATE_MAP[mapKey])
    this.status = STATE_MAP[mapKey]
    this.code = CODE_MAP[mapKey]
    this.message = MESSAGE_MAP[mapKey]
  }
}
