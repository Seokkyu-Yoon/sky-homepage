import axios from 'axios'

const apiGet = (route, params) => new Promise((resolve, reject) => {
  axios({
    method: 'GET',
    url: `${process.env.VUE_APP_SERVER || ''}${route}`,
    params,
    withCredentials: true
  })
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e.response.data || e))
})

const apiPost = (route, data) => new Promise((resolve, reject) => {
  axios({
    method: 'POST',
    url: `${process.env.VUE_APP_SERVER || ''}${route}`,
    data,
    withCredentials: true
  })
    .then(resolve)
    .catch(e => reject(e.response.data || e))
})

const apiDelete = (route, data) => new Promise((resolve, reject) => {
  axios({
    method: 'DELETE',
    url: `${process.env.VUE_APP_SERVER || ''}${route}`,
    data,
    withCredentials: true
  })
    .then(resolve)
    .catch(e => reject(e.response.data || e))
})

const auth = ({ accessToken = null }) => apiPost('/auth', { accessToken })
const signin = ({ id = '', pw = '' }) => apiPost('/auth/signin', { id, pw })
const signup = ({ id = '', pw = '', name = '' }) => apiPost('/auth/signup', { id, pw, name })

const getBoard = ({ id = -1, startIndex = 0 }) => apiGet('/api/board', { id, startIndex })
const addBoard = ({ title = '', description = '', contents = [] }) => apiPost('/api/board', { title, description, contents })
const removeBoard = ({ id = -1, writter = '' }) => apiDelete('/api/board', { id, writter })

export {
  auth,
  signin,
  signup,

  getBoard,
  addBoard,
  removeBoard
}
