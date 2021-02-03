import jwt from 'jsonwebtoken'
import Config, { PRIVATE_KEY } from './config'

const publish = (data) => new Promise((resolve, reject) => {
  jwt.sign({ ...Config, data }, PRIVATE_KEY, { expiresIn: '30d' }, (err, token) => {
    if (err) return reject(err)
    resolve(token)
  })
})

const verify = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) return reject(err)
    resolve(decoded)
  })
})

export default {
  publish,
  verify
}
