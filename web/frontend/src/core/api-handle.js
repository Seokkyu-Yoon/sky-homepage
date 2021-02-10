import axios from 'axios'

const get = (route, params) => new Promise((resolve, reject) => {
  axios({
    method: 'GET',
    url: `${process.env.VUE_APP_SERVER || ''}${route}`,
    params,
    withCredentials: true
  })
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e.response.data || e))
})

const post = (route, data) => new Promise((resolve, reject) => {
  axios({
    method: 'POST',
    url: `${process.env.VUE_APP_SERVER || ''}${route}`,
    data,
    withCredentials: true
  })
    .then(resolve)
    .catch(e => reject(e.response.data || e))
})

function handle () {

}

export default handle
