import $axios from 'axios'

const pluginAxios = {
  install (vue) {
    vue.mixin({})
    Object.assign(vue.prototype, {
      $get: (route, params) => $axios({
        method: 'GET',
        url: `${process.env.VUE_APP_SERVER || ''}${route}`,
        params
      }),
      $post: (route, data) => $axios({
        method: 'POST',
        url: `${process.env.VUE_APP_SERVER || ''}${route}`,
        data
      })
    })
  }
}

export default pluginAxios
