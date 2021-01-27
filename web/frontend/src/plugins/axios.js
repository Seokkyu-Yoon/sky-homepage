import $axios from 'axios'

const pluginAxios = {
  install (vue) {
    vue.mixin({})
    Object.assign(vue.prototype, { $axios })
  }
}

export default pluginAxios
