import $axios from 'axios'

const pluginAxios = {
  install (vue) {
    vue.mixin({})
    Object.assign(vue.prototype, {
      $get: (route, params) => new Promise((resolve, reject) => {
        $axios({
          method: 'GET',
          url: `${process.env.VUE_APP_SERVER || ''}${route}`,
          params,
          withCredentials: true
        })
          .then(resolve)
          .catch((e) => reject(e.response.data || e))
      }),
      $post: (route, data) => new Promise((resolve, reject) => {
        $axios({
          method: 'POST',
          url: `${process.env.VUE_APP_SERVER || ''}${route}`,
          data,
          withCredentials: true
        })
          .then(resolve)
          .catch(e => reject(e.response.data || e))
      })
    })
  }
}

export default pluginAxios
