import test from 'tape'
import jwt from './index'

test('jwt', (t) => {
  const data = {
    id: 'test',
    pw: 'test',
    name: '테스트'
  }

  t.test('jwt publish', async (t) => {
    const token = await jwt.publish(data)
    t.equal(typeof token, 'string')

    t.test('jwt verify', async (t) => {
      const { data: decodedData } = await jwt.verify(token)
      t.deepEqual(data, decodedData)
      t.end()
    })
    t.end()
  })
  t.end()
})
